const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';

const SIGNUP = 'redux-example/auth/SIGNUP';
const SIGNUP_SUCCESS = 'redux-example/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux-example/auth/SIGNUP_FAIL';

const SELECT_TYPE = 'redux-example/auth/SELECT_TYPE';
const initialState = {
  loaded: false,
  singupType: 'PERSON',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_TYPE:
      return {
        ...state,
        singupType: action.select,
      };
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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };

    case SIGNUP:
      console.log('SIGNUP');
      return {
        ...state,
        signup: true
      };
    case SIGNUP_SUCCESS:
      if (action.result && action.result.error) {
        console.log(action.result.error);
      }
      return {
        ...state,
        signup: false,
        user: action.result.user
      };
    case SIGNUP_FAIL:
      console.log('SIGNUP_FAIL');
      console.log(action.error);
      if (action.result && action.result.error) {
        console.log(action.result.error);
      }
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
    promise: (client) => client.get('/loadAuth')
  };
}


export function signup(username, pwd) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signup', {
      data: {
        username: username,
        password: pwd
      }
    })
  };
}

export function selectType(desc) {
  return {
    type: SELECT_TYPE,
    select: desc,
  };
}
