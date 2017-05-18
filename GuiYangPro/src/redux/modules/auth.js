import {portId} from '../port';
import cookie from 'react-cookie';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
// const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
// const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const SIGNUP = 'redux-example/auth/SIGNUP';
const SIGNUP_SUCCESS = 'redux-example/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux-example/auth/SIGNUP_FAIL';

const LOADS = 'redux-example/auth/LOADS';
const LOADS_SUCCESS = 'redux-example/auth/LOADS_SUCCESS';
const LOADS_FAIL = 'redux-example/auth/LOADS_FAIL';

const AUTH_CLEAR_ERROR = 'redux-example/auth/AUTH_CLEAR_ERROR';
const AUTH_CLEAR_LOGINSTATE = 'redux-example/auth/AUTH_CLEAR_LOGINSTATE';

const initialState = {
  isLogin: false,
  user: {},
  loginError: {},

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };

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
      cookie.save('token', 'JWT ' + action.result.data.token, { path: '/' });
      setTimeout(()=>{
        global.dataRefreshNotifier.emit('onLoginComplete');
      }, 50);
      return {
        ...state,
        loaded: true,
        loginFail: action.result,
        user: action.result.data.user
      };

    case LOGIN_FAIL:
      setTimeout(()=>{
        global.dataRefreshNotifier.emit('onLoginComplete');
      }, 50);
      return {
        ...state,
        loggingIn: false,
        user: {},
        loginFail: action.result,
        loginError: action.error
      };

    case AUTH_CLEAR_LOGINSTATE:
      return {
        ...state,
        loggingIn: false,
      };
    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        loginError: {},
      };

    // case LOGOUT:
    //   return {
    //     ...state,
    //     loggingOut: true
    //   };
    case LOGOUT_SUCCESS:
      cookie.remove('token', { path: '/' });
      return {
        ...state,
        loggingOut: false,
        user: {}
      };
    // case LOGOUT_FAIL:
    //   return {
    //     ...state,
    //     loggingOut: false,
    //     logoutError: action.error
    //   };
    case SIGNUP:
      return {
        ...state,
        signup: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: false,
        signupState: action.result,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signup: false,
        signupError: action.error
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`${portId}auth/loggedin`)
  };
}

export function loads() {
  return {
    types: [LOADS, LOADS_SUCCESS, LOADS_FAIL],
    promise: (client) => client.get(`${portId}auth/loggedin`)
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post(`${portId}auth/login`, {
      data: {
        tel: username,
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

// export function logout() {
//   return {
//     types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
//     promise: (client) => client.get(`${portId}auth/logout`)
//   };
// }

export function signup(data) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post(`${portId}auth/register`, {
      data: data
    })
  };
}

export function clearError() {
  return {
    type: AUTH_CLEAR_ERROR,
  };
}

export function clearLoginState() {
  return {
    type: AUTH_CLEAR_LOGINSTATE,
  };
}
