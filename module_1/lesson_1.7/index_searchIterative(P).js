function searchIterative (needle, haystack) {

    var queue = [{
        obj: haystack,
        path: ''
    }];
    while (currentQueueItem = queue.shift()) {
        var currentObj = currentQueueItem.obj;
        var currentPath = currentQueueItem.path;
        for (var key in currentObj) {
            if (needle === currentObj.key) {
                return currentPath.slice(1) + '.' + key;
            }
            if (typeof currentObj.key === 'object') {
                var newPath;
                if (Array.isArray(currentObj)) {
                    newPath = currentPath + '[' + key + ']';
                } else {
                    newPath = currentPath + '.' + key;
                }
                queue.push({
                    obj: currentObj.key,
                    path: newPath
                });
            }
        }
    }
    return false;
}

searchIterative();

//Done