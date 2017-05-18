import {portId} from '../port';
// import cookie from 'react-cookie';

const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';

const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';

const LOADS = 'redux-example/auth/LOADS';
const LOADS_SUCCESS = 'redux-example/auth/LOADS_SUCCESS';
const LOADS_FAIL = 'redux-example/auth/LOADS_FAIL';


const initialState = {
  loaded: false,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case LOADS:
      return {
        ...state,
        isLogin: false,
        loginUser: {}
      };
    case LOADS_SUCCESS:
      return {
        ...state,
        isLogin: true,
        loaded: true,
        loginUser: action.result,
        user: action.result.data.user
      };
    case LOADS_FAIL:
      return {
        ...state,
        isLogin: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      // cookie.save('token', 'JWT ' + action.result.data.token, {path: '/login'});
      setTimeout(()=> {
        global.dataRefreshNotifier.emit('onLoginComplete');
      }, 50);
      return {
        ...state,
        loggingIn: false,
        user: action.result.data.user
      };

    case LOGIN_FAIL:
      // setTimeout(()=> {
      //   global.dataRefreshNotifier.emit('onLoginComplete');
      // }, 50);
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action
      };

    case LOGOUT_SUCCESS:
      // cookie.remove('token', {path: '/login'});
      return {
        ...state,
        loggingOut: false,
        user: {}
      };

    default:
      return state;
  }
}

export function loads() {
  return {
    types: [LOADS, LOADS_SUCCESS, LOADS_FAIL],
    promise: (client) => client.get(`${portId}auth/loggedin`)
  };
}


export function logins(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post(`${portId}auth/login`, {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
