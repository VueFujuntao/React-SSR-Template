import React from 'react';
import App from './views/app.jsx';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
export { createStoreMap } from './store/store';

useStaticRendering(true);

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App/>
    </StaticRouter>
  </Provider>
)
