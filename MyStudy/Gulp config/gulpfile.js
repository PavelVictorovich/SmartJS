'use strict';

const   gulp = require('gulp'),
        watch = require('gulp-watch'),
        prefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        del = require('del'),
        rigger = require('gulp-rigger'),
        cssmin = require('gulp-minify-css'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        browserSync = require("browser-sync"),
        gulpIf = require('gulp-if'),
        notify = require('gulp-notify'),
        combiner = require('stream-combiner2').obj,
        through2 = require('through2').obj,
        eslint = require('gulp-eslint'),
        fs = require('fs'),
        webpack = require('webpack'),
        gulplog = require('gulplog'),
        notifier = require('node-notifier'),
        path = require('path');

var paths = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        libs: 'build/libs/'
    },
    src: {
        html: 'src/*.html',
        js: './src/js/main',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    clean: './build'
};

gulp.task('webserver', function () {
    browserSync.init({
        server: 'build'
    });
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
    return del(paths.clean);
});

gulp.task('html:build', function () {
    return gulp.src(paths.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(paths.build.html));
});

gulp.task('libs:build', function () {
    return gulp.src(paths.src.libs)
        .pipe(gulp.dest(paths.build.libs));
});

gulp.task('js:build', function (callback) {

    let options = {
        entry: [
            /*'babel-polyfill',*/
            paths.src.js
        ],
        output: {
            path: path.resolve(__dirname, paths.build.js),
            filename: 'bundle.js',
        },
        watch:   true,
        devtool: 'inline-source-map',
        module:  {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings:     false,
                    unsafe:       true
                }
            })
        ],
        externals: {
            "jquery": "jQuery"
        },
    };
    webpack(options, function(err, stats) {
        if (!err) {
            err = stats.toJson().errors[0];
        }
        if (err) {
            notifier.notify({
                title: 'Webpack',
                message: err
            });
            gulplog.error(err);
        } else {
            gulplog.info(stats.toString({
                colors: true
            }));
        }
        if (!options.watch && err) {
            callback(err);
        } else {
            callback();
        }
    });
});

gulp.task('style:build', function () {
    return gulp.src(paths.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('image:build', function () {
    return gulp.src(paths.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(paths.build.img));
});

gulp.task('fonts:build', function() {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('build', gulp.series('clean', gulp.parallel('html:build', 'js:build', 'style:build', 'fonts:build', 'image:build', 'libs:build')));

gulp.task('watch', function(){
    gulp.watch([paths.watch.html], gulp.series('html:build'));
    gulp.watch([paths.watch.style], gulp.series('style:build'));
    gulp.watch([paths.watch.js], gulp.series('js:build'));
    gulp.watch([paths.watch.img], gulp.series('image:build'));
    gulp.watch([paths.watch.fonts], gulp.series('fonts:build'));
    gulp.watch([paths.watch.fonts], gulp.series('libs:build'));
});

gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));

gulp.task('lint', function() {
    let eslintResults = {};
    let cacheFilePath = process.cwd() + '/tmp/lintCache.json';

    try {
        eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
    } catch (e) {
    }

    return gulp.src('src/**/*.js', {read: false})
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
