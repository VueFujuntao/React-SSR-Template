const ejs = require('ejs');
const serialize = require('serialize-javascript');
const asyncBootstrap = require('react-async-bootstrapper').default;
const ReactDOMServer = require('react-dom/server');
const Heimet = require('react-helmet').default;

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;
    let routerContext = {};
    const stores = createStoreMap();
    const app = createApp(stores, routerContext, req.url);
    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.end();
        return;
      }
      const state = getStoreState(stores);
      const content = ReactDOMServer.renderToString(app);
      const helmet = Heimet.rewind();
      
      const html = ejs.render(template, {
        appString: content,
        initalState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString()
      });

      res.send(html);
      resolve(true);
    }).catch(reject)
  })
}