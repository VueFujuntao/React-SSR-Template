import ReactDOM from 'react-dom';
import React from 'react';
import App from './app.jsx';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <App />,
  document.getElementById('app')
)