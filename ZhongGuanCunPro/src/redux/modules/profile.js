const LOAD = 'poe/profile/LOAD';
const LOAD_SUCCESS = 'poe/profile/LOAD_SUCCESS';
const LOAD_FAIL = 'poe/profile/LOAD_FAIL';

const initialState = {
  transactions: {
    transactionList: [],
    isLoading: false,
    error: null
  }
};


export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case LOAD:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          isLoading: true
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          transactionList: action.result.transactions,
          isLoading: false
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          isLoading: false,
          error: action.error
        }
      };
  }
}


export function load(username) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/profile/load', {
      data: {
        username: username
      }
    })
  };
}
