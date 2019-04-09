import React from 'react';

export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(1)
  }
  render() {
    return (
      <h1>TopicList</h1>
    )
  }
}