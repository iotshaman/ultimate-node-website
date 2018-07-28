module.exports.load = function(runtime) {
    runtime.contents = { sampleDynamicContent: {} }
    let operations = [
        new Promise(function(res, err) {
            //THIS WOULD BE A DATABASE QUERY
            runtime.contents.sampleDynamicContent = { success: true };
            res();
        })
    ]
    return Promise.all(operations).then(function() {
        return runtime;  
    });
}