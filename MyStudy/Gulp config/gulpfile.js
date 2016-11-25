'use strict';

const path = require('path');
const del = require('del');
const debug = require('gulp-debug');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const resolver = require('stylus').resolver;
const svgSprite = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;
const through2 = require('through2').obj;
const eslint = require('gulp-eslint');
const fs = require('fs');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream'); // Gulp + Webpack = ♡
const webpack = webpackStream.webpack;
const named = require('vinyl-named');
const gulplog = require('gulplog');
const uglify = require('gulp-uglify');
const AssetsPlugin = require('assets-webpack-plugin');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
    return gulp.src('frontend/styles/index.scss')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title:   'Styles',
                message: err.message
            }))
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus({
            define: {
                url: resolver()
            }
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulpIf(!isDevelopment, combiner(cssnano(), rev())))
        .pipe(gulp.dest('public/styles'))
        .pipe(gulpIf(!isDevelopment, combiner(rev.manifest('css.json'), gulp.dest('manifest'))));

});

gulp.task('styles:svg', function() {
    return gulp.src('frontend/styles/**/*.svg')
        .pipe(svgSprite({
            mode: {
                css: {
                    dest:       '.', // where to put style && sprite, default: 'css'
                    bust:       false,
                    sprite:     'sprite.svg', // filename for sprite relative to dest
                    layout:     'vertical',
                    prefix:     '$', // .svg-
                    dimensions: true,
                    render:     {
                        styl: {
                            dest: 'sprite.styl'  // filename for .styl relative to dest^
                        }
                    }
                }
            }
        }))
        .pipe(debug({title: 'styles:svg'}))
        .pipe(gulpIf('*.styl', gulp.dest('tmp/styles'), gulp.dest('public/styles')));
});

gulp.task('clean', function() {
    return del(['public', 'tmp', 'manifest']);
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
        .pipe(gulpIf(!isDevelopment, revReplace({
            manifest: gulp.src('manifest/css.json', {allowEmpty: true})
        })))
        .pipe(gulpIf(!isDevelopment, revReplace({
            manifest: gulp.src('manifest/webpack.json', {allowEmpty: true})
        })))
        .pipe(gulp.dest('public'));
});

gulp.task('styles:assets', function() {
    return gulp.src('frontend/styles/**/*.{svg,png}', {since: gulp.lastRun('styles:assets')})
        .pipe(gulpIf(!isDevelopment, rev()))
        .pipe(gulp.dest('public/styles'))
        .pipe(gulpIf(!isDevelopment, combiner(rev.manifest('assets.json'), gulp.dest('manifest'))));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles:assets', 'styles', 'webpack'), 'assets'));

gulp.task('watch', function() {
    gulp.watch('frontend/styles/**/*.styl', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/styles/**/*.{svg,png}', gulp.series('styles:assets'));
});

gulp.task('serve', function() {
    browserSync.init({ server: 'public' });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve', function() {
    gulp.watch('frontend/styles/**/*.styl', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/styles/**/*.{svg,png}', gulp.series('styles:assets'));
})));

gulp.task('lint', function() {
    let eslintResults = {};
    let cacheFilePath = process.cwd() + '/tmp/lintCache.json';
    try {
        eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
    } catch (e) {
    }
    return gulp.src('frontend/**/*.js', {read: false})
        .pipe(gulpIf(
            function(file) {
                return eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
            },
            through2(function(file, enc, callback) {
                file.eslint = eslintResults[file.path].eslint;
                callback(null, file);
            }),
            combiner(
                through2(function(file, enc, callback) {
                    file.contents = fs.readFileSync(file.path);
                    callback(null, file);
                }),
                eslint(),
                through2(function(file, enc, callback) {
                    eslintResults[file.path] = {
                        eslint: file.eslint,
                        mtime: file.stat.mtime
                    };
                    callback(null, file);
                })
            )
        ))
        .on('end', function() {
            fs.writeFileSync(cacheFilePath, JSON.stringify((eslintResults)));
        })
        .pipe(eslint.failAfterError());
});

gulp.task('webpack', function(callback) {
    let firstBuildReady = false;
    function done(err, stats) {
        firstBuildReady = true;
        if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
            return;  // emit('error', err) in webpack-stream
        }
        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true
        }));
    }
    let options = {
        output: {
            publicPath: '/js/',
            filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
        },
        watch:   isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module:  {
            loaders: [{
                test:    /\.js$/,
                include: path.join(__dirname, "frontend"),
                loader:  'babel?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };
    if (!isDevelopment) {
        options.plugins.push(new AssetsPlugin({
            filename: 'webpack.json',
            path:     __dirname + '/manifest',
            processOutput(assets) {
                for (let key in assets) {
                    assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
                    delete assets[key];
                }
                return JSON.stringify(assets);
            }
        }));
    }
    return gulp.src('frontend/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title:   'Webpack',
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(webpackStream(options, null, done))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest('public/js'))
        .on('data', function() {
            if (firstBuildReady) {
                callback();
            }
        });
});