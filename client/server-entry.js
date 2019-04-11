import React from 'react';
import App from './views/app.jsx';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
// import StyleContext from 'isomorphic-style-loader/StyleContext';
export { createStoreMap } from './store/store';
import { JssProvider } from 'react-jss'

useStaticRendering(true);

export default (stores, routerContext, url, sheetsRegistry, jss) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
    <JssProvider registry={sheetsRegistry} jss={jss}>
      <App />
    </JssProvider>
    </StaticRouter>
  </Provider>
)
