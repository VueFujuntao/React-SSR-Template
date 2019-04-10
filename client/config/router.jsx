import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import TopicList from '../views/topic-list';
import TopicDetail from '../views/topic-detail';

// export default class Routes extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <Switch>
//         <Route path="/" exact render={() => <Redirect to="/list" />} />
//         <Route path="/list" component={TopicList}  />
//         <Route path="/detail" component={TopicDetail}  />
//       </Switch>
//     )
//   }
// }

export default () => [
  <Route path="/" exact render={() => <Redirect to="/list" />} />,
  <Route path="/list" component={TopicList}  />,
  <Route path="/detail" component={TopicDetail}  />
]