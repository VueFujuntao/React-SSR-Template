const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const ReactDOMServer = require('react-dom/server');
const serverConfig = require('../../build/webpack.config.server.js');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html').then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
}
const Module = module.constructor

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle, createStoreMap;
serverCompiler.watch({}, (err, stats) => {
 if (err) throw err;
 stats = stats.toJson();
 stats.errors.forEach(element => {
   console.error('error' + element);
 });
 stats.warnings.forEach(element => {
   console.warn('waring  ' + element);
 });

 const bundlePath = path.join(
   serverConfig.output.path,
   serverConfig.output.filename
 )
 
 const bundle = mfs.readFileSync(bundlePath, 'utf-8');
 const m = new Module();
 m._compile(bundle, 'server-entry.js');
 serverBundle = m.exports.default;
 createStoreMap = m.exports.createStoreMap;
})

module.exports = function(app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }));
  app.get('*', function(req, res) {
    getTemplate().then(template => {
      let routerContext = {};
      // console.log(createStoreMap);
      const app = serverBundle(createStoreMap(), routerContext, req.url);
      const content = ReactDOMServer.renderToString(app);
      // console.log(routerContext.url)

      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.end();
        return;
      }
      res.send(template.data.replace('<!-- APP Build -->', content));
    })
  })
}