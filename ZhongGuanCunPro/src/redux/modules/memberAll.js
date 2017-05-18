import {portId} from '../port';

const MEMBERALL_LOAD = 'wanglupoc/memberAll/MEMBERALL_LOAD';
const MEMBERALL_SUCCESS = 'wanglupoc/memberAll/MEMBERALL_SUCCESS';
const MEMBERALL_FAIL = 'wanglupoc/memberAll/MEMBERALL_FAIL';

const MEMBERALL_PAGE = 'wanglupoc/memberAll/MEMBERALL_PAGE';

const MEMBERALL_KEYWORD = 'wanglupoc/memberAll/MEMBERALL_KEYWORD';

const MEMBERALL_SEARCH_LOAD = 'wanglupoc/memberAll/MEMBERALL_SEARCH_LOAD';
const MEMBERALL_SEARCH_SUCCESS = 'wanglupoc/memberAll/MEMBERALL_SEARCH_SUCCESS';
const MEMBERALL_SEARCH_FAIL = 'wanglupoc/memberAll/MEMBERALL_SEARCH_FAIL';

const initialState = {
  memberAllData: {
    data: [],
  },
  count: 0,
  theKeyword: '',
};

export default function memberAll(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case MEMBERALL_SUCCESS:
      return {
        ...state,
        memberAllData: action.result,
      };
    case MEMBERALL_PAGE:
      return {
        ...state,
        count: action.payload,
      };
    case MEMBERALL_KEYWORD:
      return {
        ...state,
        theKeyword: action.keyword,
      };

    case MEMBERALL_SEARCH_SUCCESS:
      return {
        ...state,
        memberAllData: action.result,
      };
  }
}


export function queryMemberAll(id) {
  return {
    types: [MEMBERALL_LOAD, MEMBERALL_SUCCESS, MEMBERALL_FAIL],
    promise: (client) => client.get(`${portId}members?page=${id}&client=true`)
  };
}

export function selectPage(page) {
  return {
    type: MEMBERALL_PAGE,
    payload: page
  };
}

export function saveKeyword(keyword) {
  return {
    type: MEMBERALL_KEYWORD,
    keyword: keyword,
  };
}

export function searchMemberAll(keyword, page) {
  return {
    types: [MEMBERALL_SEARCH_LOAD, MEMBERALL_SEARCH_SUCCESS, MEMBERALL_SEARCH_FAIL],
    promise: (client) => client.get(`${portId}members/search?keyword=${keyword}&page=${page}`)
  };
}
