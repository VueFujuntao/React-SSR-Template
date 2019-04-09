import React from 'react';
import axios from 'axios';
axios.baseUrl = 'http:localhost:3000';

export default class TestApi extends React.Component {
  render() {
    return (
        <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
        </div>
    )
  }
  getTopics() {
    axios.get('/api/topics').then(response => {
        console.log(response);
    })
  }
  login() {
    axios.post('/api/user/login', {
        accessToken: 'cc2f113a-88bd-492b-b7ed-d5909300b54c'
    }).then(response => {
        console.log(response);
    })
  }
  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true').then(response => {
        console.log(response);
    })
  }
}