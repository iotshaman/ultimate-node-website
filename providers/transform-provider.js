module.exports = function(runtime) {
    return function(path, data) {
        var route = `/${path.replace('views/', '').replace('.html', '')}`;
        if (route == '/index') route = '';
        data.route = route;
        data.path = path;
        data.IS_PROD = runtime.PROD_FLAG;
        return data;
    }
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}