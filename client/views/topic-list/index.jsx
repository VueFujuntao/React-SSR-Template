import React from 'react';
import Helmet from 'react-helmet';

export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(1)
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is topic lists"></meta>
        </Helmet>
        <h1>TopicList</h1>
      </div>
    )
  }
}