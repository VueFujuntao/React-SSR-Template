const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const serverConfig = require('../../build/webpack.config.server.js');
const serverRender = require('./server-render');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs').then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    })
  })
}

const NativeModule = require('module');
const vm = require('vm');

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
}

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
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
  const m = getModuleFromString(bundle, 'server-entry.js');
  serverBundle = m.exports;
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }));
  app.get('*', function (req, res, next) {
    getTemplate().then(template => {
      return serverRender(serverBundle, template.data, req, res);
    }).catch(err => {
      // 牛逼操作
      next();
    })
  })
}