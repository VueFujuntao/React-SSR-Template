import React from 'react';
import Helmet from 'react-helmet';
import './index.css';

export default class TopicDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(2)
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>this is topic detail</title>
          <meta name="description" content="this is topic detail"></meta>
        </Helmet>
        <h1 className="titles">this.TopicDetail</h1>
      </div>
    )
  }
}