import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router.jsx';
// import { observer, inject } from 'mobx-react';
// import PropTypes from 'prop-types';
// import { AppState } from '../store/app.state.js';
// import TestApi from './test/api-test.jsx';
// import { injectSheet } from 'react-jss';
import { connect } from 'react-redux';
// import store from '../store/store.js';
import { setSourceDataInput } from '../redux/module/dataSource'
import 'antd/dist/antd.css';
import { Button } from "antd";

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
// @inject('appState')
// @observer
console.log(Routes)

@connect(
  store => store.dataSource,
  {setSourceDataInput}
)
export default class App extends React.Component {
  componentWillMount() {
    console.log(2)
    // this.props.setSourceDataInput(10)

    if (typeof window === 'undefined') {
      console.log(12)
      this.props.setSourceDataInput(10)
    }
  }
  componentDidMount() {
    console.log(3)
    console.log(this.props)
    // console.log(this.props.setSourceDataInput())
  }
  static fetch() {
    console.log(1)
  }
  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.setSourceDataInput()
        resolve(true)
      }, 500)
    })
  }
  render() {
    return (
      <div>
        <Link to="/">首页</Link>
        <br />
        <Link to="/detail">
          <Button>详情</Button>
        </Link>
        {this.props.pageNum}
        {/* {this.props.appState.msg} */}
        <Routes/>
      </div>
    )
  }
}

// App.propTypes = {
//   appState: PropTypes.instanceOf(AppState)
// }
