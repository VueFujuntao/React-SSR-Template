import React from 'react';
import App from './views/app.jsx';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import { JssProvider } from 'react-jss';
export { createStoreMap } from './store/store';

useStaticRendering(true);

export default (stores, routerContext, url, sheets) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
    <JssProvider registry={sheets}>
      <App/>
    </JssProvider>
    </StaticRouter>
  </Provider>
)
