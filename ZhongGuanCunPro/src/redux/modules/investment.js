import {portId} from '../port';

const INVESTMENT = 'wanglupoc/investment/INVESTMENT';
const INVEST_PAGE = 'wanglupoc/investment/INVEST_PAGE';

const INVEST_LOAD = 'wanglupoc/investment/INVEST_LOAD';
const INVEST_SUCCESS = 'wanglupoc/investment/INVEST_SUCCESS';
const INVEST_FAIL = 'wanglupoc/investment/INVEST_FAIL';

const INVEST_KEYWORD = 'wanglupoc/project/INVEST_KEYWORD';

const INVEST_SEARCH_LOAD = 'wanglupoc/project/INVEST_SEARCH_LOAD';
const INVEST_SEARCH_SUCCESS = 'wanglupoc/project/INVEST_SEARCH_SUCCESS';
const INVEST_SEARCH_FAIL = 'wanglupoc/project/INVEST_SEARCH_FAIL';

const initialState = {
  isinvest: 'A',
  investData: {},
  count: 0,
  theKeyword: '',
};

export default function investment(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case INVESTMENT:
      return {
        ...state,
        isinvest: action.payload
      };
    case INVEST_SUCCESS:
      return {
        ...state,
        investData: action.result,
      };
    case INVEST_PAGE:
      return {
        ...state,
        count: action.payload,
      };
    case INVEST_KEYWORD:
      return {
        ...state,
        theKeyword: action.keyword,
      };
    case INVEST_SEARCH_SUCCESS:
      return {
        ...state,
        investData: action.result,
      };
  }
}

export function investChoose(select) {
  return {
    type: INVESTMENT,
    payload: select
  };
}

export function saveKeyword(keyword) {
  return {
    type: INVEST_KEYWORD,
    keyword: keyword,
  };
}

export function queryInvest(id, invest) {
  return {
    types: [INVEST_LOAD, INVEST_SUCCESS, INVEST_FAIL],
    promise: (client) => client.get(`${portId}investors?page=${id}&cate=${invest}&client=true`)
  };
}

export function selectPage(page) {
  return {
    type: INVEST_PAGE,
    payload: page
  };
}

export function searchInvest(keyword, page) {
  return {
    types: [INVEST_SEARCH_LOAD, INVEST_SEARCH_SUCCESS, INVEST_SEARCH_FAIL],
    promise: (client) => client.get(`${portId}investors/search?keyword=${keyword}&page=${page}`)
  };
}
