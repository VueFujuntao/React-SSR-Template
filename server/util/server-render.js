const ejs = require('ejs');
const serialize = require('serialize-javascript');
const asyncBootstrap = require('react-async-bootstrapper').default;
const ReactDOMServer = require('react-dom/server');
const Heimet = require('react-helmet').default;
const SheetsRegistry = require('react-jss').SheetsRegistry
// const create = require('jss').create
const preset = require('jss-preset-default').default
const create = require('jss').create

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
    let routerContext = {
      css: []
    };
    const stores = createStoreMap();
    
    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset())

    const app = createApp(stores, routerContext, req.url, sheetsRegistry, jss);
    asyncBootstrap(app).then(() => {
      // console.log(JssProvider)
      // const content = ReactDOMServer.renderToString(
      //   <JssProvider registry={sheets}>
      //     <app />
      //   </JssProvider>
      // )
      // console.log(sheets.toString())
      const content = ReactDOMServer.renderToString(app);
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.end();
        return;
      }
      const state = getStoreState(stores);
      const helmet = Heimet.rewind();
      // console.log(sheetsRegistry.toString())
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