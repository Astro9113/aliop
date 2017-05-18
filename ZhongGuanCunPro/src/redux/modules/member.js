const LOAD = 'member/LOAD';
const LOAD_SUCCESS = 'member/LOAD_SUCCESS';
const LOAD_FAIL = 'member/LOAD_FAIL';

const initialState = {
  transactionList: {
    transactions: [],
    isLoading: false,
    error: null
  },
  activeTransaction: {
    transaction: null,
    isLoading: false,
    error: null
  }
};

export default function member(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case LOAD:
      return {
        ...state,
        transactionList: {
          ...state.transactionList,
          isLoading: true
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        transactionList: {
          ...state.transactionList,
          isLoading: false,
          transactions: action.result
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        transactionList: {
          ...state.transactionList,
          isLoading: false,
          error: action.error
        }
      };
  }
}

// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/transactions/load')
//   };
// }


export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/transactions/load')
  };
}
