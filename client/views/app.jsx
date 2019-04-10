import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router.jsx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../store/app.state.js';
import TestApi from './test/api-test.jsx'

@inject('appState')
@observer

export default class App extends React.Component {
  componentDidMount() {
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true)
      })
    })
  }

  render() {
    return (
      <div>
        <Link to="/">首页</Link>
        <br />
        <Link to="/detail">详情</Link>
        {this.props.appState.msg}
        <TestApi />
        <Routes />
      </div>
    )
  }
}

App.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}