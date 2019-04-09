import React from 'react';

export default class TopicDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(2)
  }
  render() {
    return (
      <h1>TopicDetail</h1>
    )
  }
}