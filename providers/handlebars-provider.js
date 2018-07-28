var moment = require('moment');

module.exports.partials = function() {
    return function(handlebars) {
        handlebars.registerHelper('moment', function(date, format, options) {
            let rslt = moment(new Date(date)).format(format);
            return rslt;
        });
        handlebars.registerHelper('sample', function(text, length, suffix, options) {
            if (!text || !text.length) { return ''; }
            if (text.length <= length) { return text; }
            return `${text.substring(0, length)}.....${!suffix ? '' : suffix}`;
        });
        handlebars.registerHelper('gt', function(item1, item2, options) {
            if (item1 > item2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    }
}