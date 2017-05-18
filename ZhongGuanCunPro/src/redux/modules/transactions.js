const LOAD = 'poe/transactions/LOAD';
const LOAD_SUCCESS = 'poe/transactions/LOAD_SUCCESS';
const LOAD_FAIL = 'poe/transactions/LOAD_FAIL';
const LOAD_DETAIL = 'poe/transactions/LOAD_DETAIL';
const LOAD_DETAIL_SUCCESS = 'poe/transactions/LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_FAIL = 'poe/transactions/LOAD_DETAIL_FAIL';

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

export default function transactions(state = initialState, action = {}) {
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
    case LOAD_DETAIL:
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          isLoading: true
        }
      };
    case LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          isLoading: false,
          transaction: action.result
        }
      };
    case LOAD_DETAIL_FAIL:
      return {
        ...state,
        activeTransaction: {
          ...state.activeTransaction,
          isLoading: false,
          error: action.error
        }
      };
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/transactions/load')
  };
}

export function loadDetail(id) {
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: (client) => client.get(`/transactions/load/${id}`)
  };
}
