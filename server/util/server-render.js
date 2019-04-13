const ejs = require('ejs');
const serialize = require('serialize-javascript');
const asyncBootstrap = require('react-async-bootstrapper').default;
const ReactDOMServer = require('react-dom/server');
const Heimet = require('react-helmet').default;
const SheetsRegistry = require('react-jss').SheetsRegistry
// const create = require('jss').create
const preset = require('jss-preset-default').default
const create = require('jss').create
const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const compose = require('redux').compose
const thunk = require('redux-thunk')
const routerMiddleware = require('react-router-redux').routerMiddleware
const createMemoryHistory = require('history').createMemoryHistory
const matchRoutes = require('react-router-config').matchRoutes

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    // const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;
    // console.log(bundle.routers)
    let routerContext = {
      css: []
    };

    // const stores = createStoreMap();
    // const branch = matchRoutes(bundle.routers, req.url)
    // const promises = branch.map(({route}) => {
    //   const fetch = route.fetch;
    //   console.log('112'+fetch)
    //   // return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
    // });
    // console.log(promises)
    // const sheetsRegistry = new SheetsRegistry()
    // const jss = create(preset())
    // redux
    const initialState = {};
    const path = req.url;
    // const history = createMemoryHistory({
    //   initialEntries: [path]
    // });
    // console.log(history)
    // const h = compose(applyMiddleware(thunk));
    // // console.log(h)
    // const store = createStore(
    //   // redux 状态池
    //   bundle.store,
    //   compose()
    // )
    // const middleware = [thunk, routerMiddleware(history)];
    // console.log(middleware);
    // // console.log(history);
    // const composedEnhancers = compose(applyMiddleware(...middleware.default));
    // const store = createStore(bundle.store, initialState, composedEnhancers);
    // console.log(store)
    // const store = bundle.getStore(req.url);
    // console.log(store)
    // console.log(s)
    // bundle.storeed
    const store = bundle.storeed
    const app = createApp(store, routerContext, req.url);
    console.log(asyncBootstrap)
    asyncBootstrap(app).then((e) => {
      console.log(e)
      // console.log(JssProvider)
      // const content = ReactDOMServer.renderToString(
      //   <JssProvider registry={sheets}>
      //     <app />
      //   </JssProvider>
      // )
      // console.log(sheets.toString())
      const content = ReactDOMServer.renderToString(app);
      // console.log(routerContext)
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.end();
        return;
      }
      // const state = getStoreState(store);
      const helmet = Heimet.rewind();
      // const state = {a: 2}
      // console.log(sheetsRegistry.toString())
      const html = ejs.render(template, {
        appString: content,
        initalState: serialize(store.getState()),
        meta: helmet.meta.toString(),
        title: helmet.title.toString()
      });

      res.send(html);
      resolve(true);
    }).catch(reject)
  })
}