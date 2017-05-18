import React from 'react';
import {Route, IndexRoute} from 'react-router';

// import { loads } from './redux/modules/auth';
// Login,
import {
    App,
    Home,
    User,
    Warning,
    UserDetail,
    NotFound
} from './containers';

import TamperTable from './components/User/component/TamperTable';
import {Root} from './components';

export default () => {
  // const requireLogin = (nextState, replace, cb) => {
  //   const { auth: { user }} = store.getState();
  //   const { routing: { locationBeforeTransitions }} = store.getState();
  //   console.log('route', locationBeforeTransitions);
  //   setTimeout(() => {
  //     if (!user.username) {
  //       replace('/');
  //     }
  //     cb();
  //   }, 1000);
  // };
  // const userRole = store.getState().auth.user.role;
  return (
      <Route path="/" component={App}>
        <IndexRoute component={Root}/>
        <Route path="/home" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/tamper" component={TamperTable}/>
        <Route path="/warn" component={Warning}/>
        <Route path="/detail/:id" component={UserDetail}/>
        <Route path="*" component={NotFound} status={404} />
      </Route>
  );
};
