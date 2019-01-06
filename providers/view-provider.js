let nodePath = require('path');
let ShamanCompiler = require('shaman-website-compiler').CompilerFactory;
let handlebarsProvider = require('./handlebars-provider');
let Promise = require('promise');

module.exports.initialize = function(runtime) {
  return new Promise((res, err) => {
    let cwd = nodePath.join(__dirname, '..', 'src');
    var compiler = ShamanCompiler({
      cwd: cwd,
      isProd: !!runtime.isProd,
      autoWatch: !runtime.isProd,
      htmlRoot: 'views/',
      dropHtmlSuffix: true,
      minify: false,
      sitemap: { hostname: 'https://www.iotshaman.com' },
      handlebarsPlugin: handlebarsProvider.registerHandlebarsHelpers,
    });
    compiler.onCompileEnd = (rslt) => {
      var diff = Math.abs(rslt.data.startTime - rslt.data.endTime);
      console.log(`Compile Time (ms): ${diff}`)
      runtime.app.use('/', rslt.router.Express);
      res();
    }
    compiler.onCompileError = (error) => { err(error); }
    compiler.Compile();
  });
}