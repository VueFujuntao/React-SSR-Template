import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router.jsx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../store/app.state.js';
import TestApi from './test/api-test.jsx';
@inject('appState')
@observer
export default class App extends React.Component {
  componentDidMount() {
    console.log(`11111111111111111111111111111111111111111`)
  }
  render() {
    return (
      <div>
        <div>
          <Link to="/">首页</Link>
          <br />
          <Link to="/detail">详情页</Link>
          {this.props.appState.msg}
          <TestApi/>
        </div>
        <Routes />
      </div>
    )
  }
}

App.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}