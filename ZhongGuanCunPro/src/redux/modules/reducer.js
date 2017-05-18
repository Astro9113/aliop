import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';

import auth from './auth';
import poe from './poe';
import poeLocal from './poeLocal';
import poeUpload from './poeUpload';
import poeRemote from './poeRemote';
import proof from './proof';
import transactions from './transactions';
import profile from './profile';
import popup from './popup';
import investment from './investment';
import projectDetail from './projectDetail';

import loadStep from './loadstep';
import project from './project';
import memberAll from './memberAll';
import memberDetail from './memberDetail';
import header from './header';
import home from './home';
import login from './login';
// import test from './test';


import cms from './cms';
import cmsMember from './cmsMember';
import cmsCompany from './cmsCompany';
import cmsProject from './cmsProject';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  pagination,
  poe,
  poeLocal,
  poeUpload,
  poeRemote,
  proof,
  transactions,
  profile,
  popup,

  investment,
  projectDetail,
  loadStep,
  project,
  memberAll,
  memberDetail,

  // test,
  login,
  cms,
  cmsMember,
  cmsCompany,
  cmsProject,
  header,
  home,
});
