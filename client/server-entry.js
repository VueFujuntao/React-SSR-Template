import React from 'react';
import App from './views/app.jsx';
import { StaticRouter } from 'react-router-dom';
import { Provider } from "react-redux";
// import routers from './config/router'
// import { Provider, useStaticRendering } from 'mobx-react';
// import StyleContext from 'isomorphic-style-loader/StyleContext';
export { createStoreMap } from './store/store';
// import { JssProvider } from 'react-jss'
import  store from './redux/index';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {createMemoryHistory} from 'history';
import { routerMiddleware } from 'react-router-redux';

// useStaticRendering(true);
const storeed = createStore(
  // redux 状态池
  store,
  compose(
    applyMiddleware(thunk)
  )
)
export default (stores, routerContext, url) => (
  <Provider store = {stores}>
    <StaticRouter context={routerContext} location={url}>
    {/* <JssProvider registry={sheetsRegistry} jss={jss}> */}
      <App />
    {/* </JssProvider> */}
    </StaticRouter>
  </Provider>
)


export function getStore(path) {
  const history = createMemoryHistory({
    initialEntries: [path]
  });
  const middleware = [thunk, routerMiddleware(history)];
  // console.log(middleware)
  const composedEnhancers = compose(applyMiddleware(thunk));
  return createStore(store, composedEnhancers);
}
export { storeed, store }