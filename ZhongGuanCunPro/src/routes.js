import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Project,
  ProjectDetail,
  MemberDetail,
  MemberAll,
  // Test,
  Investment,
  Login,
  Cms,
  CmsInvest,
  CmsProject,
  CmsMember,
  NotFound,
} from './containers';

import { Home, Application, Member, About } from './components';
// <Route path="/test" component={Test} />
export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/project" component={Project} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/info" component={MemberAll} />
      <Route path="/info/:id" component={MemberDetail}/>
      <Route path="/invest" component={Investment} />
      <Route path="/member" component={Member} />
      <Route path="/application" component={Application} />
      <Route path="/about" component={About} />

      <Route path="/login" component={Login} />
      <Route path="/cms" component={Cms} >
        <IndexRoute component={CmsMember} />
        <Route path="/cms/projects" component={CmsProject} />
        <Route path="/cms/invests" component={CmsInvest} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
