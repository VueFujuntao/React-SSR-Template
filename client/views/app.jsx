import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router.jsx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../store/app.state.js';
import TestApi from './test/api-test.jsx';
// import { injectSheet } from 'react-jss';

// const styles = {
//   myButton: {
//     color: 'green',
//     margin: { // jss-expand gives more readable syntax
//       top: 5, // jss-default-unit makes this 5px
//       right: 0,
//       bottom: 0,
//       left: '1rem'
//     },
//     '& span': { // jss-nested applies this to a child span
//       fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
//     }
//   },
//   myLabel: {
//     fontStyle: 'italic'
//   }
// }
// @injectSheet(styles)
@inject('appState')
@observer
export default class App extends React.Component {
  componentWillMount() {
   
  }
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
