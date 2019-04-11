import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Provider 用来保持与 store 的更新
// import { Provider } from "react-redux";
// redux 合并后的文件
import reducer from "./redux/index.js";
import App from './views/app.jsx';
import AppState from './store/app.state';
// import injectSheet, {ThemeProvider} from 'react-jss'
// const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const root = document.getElementById('app');
const store = createStore(
  // redux 状态池
  reducer,
  compose(
    // 导入中间件 解决异步事件
    applyMiddleware(thunk),
    // react 谷歌浏览器控件 用来调试用的 需要自己安装 不然是不启动的
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);
const initState = window.__INITIAL__STATE__ || {};

const hydrate = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={new AppState(initState.appState)}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>
    </AppContainer>
    ,
    root
  )
}
console.log(process.env)
hydrate(App);

if (module.hot) {
  module.hot.accept('./views/app.jsx', () => {
    const NextApp = require('./views/app.jsx').default;
    hydrate(NextApp);
  })
}