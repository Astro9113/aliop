import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';

import auth from './auth';
import popup from './popup';
import header from './header';
import home from './home';
import user from './user';
import userDetail from './userDetail';
import warning from './warning';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  pagination,
  popup,
  header,
  home,
  user,
  userDetail,
  warning,
});
