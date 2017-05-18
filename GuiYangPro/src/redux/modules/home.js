import {portId} from '../port';

const HOME_IMG = 'wanglupoc/home/HOME_IMG';

const HOME_ADD_OPEN = 'wanglupoc/home/HOME_ADD_OPEN';
const HOME_ADD_CLOSE = 'wanglupoc/home/HOME_ADD_CLOSE';

const HOME_PAGE = 'wanglupoc/home/HOME_PAGE';
const HOME_CURRENT = 'wanglupoc/home/HOME_CURRENT';

const HOME_SEARCH = 'wanglupoc/home/HOME_SEARCH';

const HOME_APPLY_LOAD = 'wanglupoc/home/HOME_APPLY_LOAD';
const HOME_APPLY_SUCCESS = 'wanglupoc/home/HOME_APPLY_SUCCESS';
const HOME_APPLY_FAILD = 'wanglupoc/home/HOME_APPLY_FAILD';

const HOME_INSERT_LOAD = 'wanglupoc/home/HOME_INSERT_LOAD';
const HOME_INSERT_SUCCESS = 'wanglupoc/home/HOME_INSERT_SUCCESS';
const HOME_INSERT_FAILD = 'wanglupoc/home/HOME_INSERT_FAILD';

const HOME_UNIQUE_LOAD = 'wanglupoc/home/HOME_UNIQUE_LOAD';
const HOME_UNIQUE_SUCCESS = 'wanglupoc/home/HOME_UNIQUE_SUCCESS';
const HOME_UNIQUE_FAILD = 'wanglupoc/home/HOME_UNIQUE_FAILD';

const HOME_SEARCH_LOAD = 'wanglupoc/home/HOME_SEARCH_LOAD';
const HOME_SEARCH_SUCCESS = 'wanglupoc/home/HOME_SEARCH_SUCCESS';
const HOME_SEARCH_FAIL = 'wanglupoc/home/HOME_SEARCH_FAIL';

const HOME_DRAFT_LOAD = 'wanglupoc/home/HOME_DRAFT_LOAD';
const HOME_DRAFT_SUCCESS = 'wanglupoc/home/HOME_DRAFT_SUCCESS';
const HOME_DRAFT_FAIL = 'wanglupoc/home/HOME_DRAFT_FAIL';

const HOME_AUDIT_LOAD = 'wanglupoc/home/HOME_AUDIT_LOAD';
const HOME_AUDIT_SUCCESS = 'wanglupoc/home/HOME_AUDIT_SUCCESS';
const HOME_AUDIT_FAILD = 'wanglupoc/home/HOME_AUDIT_FAILD';

const HOME_CLEARSTATE_SUCCESS = 'wanglupoc/home/HOME_CLEARSTATE_SUCCESS';

const initialState = {
  homeImg: '',
  homeAdd: false,
  thisPage: 0,
  pageNum: 0,
  homeSearch: 'all',
};

export default function home(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case HOME_IMG:
      return {
        ...state,
        homeImg: action.active,
      };
    case HOME_ADD_OPEN:
      return {
        ...state,
        homeAdd: true,
      };
    case HOME_ADD_CLOSE:
      return {
        ...state,
        homeAdd: false,
      };
    case HOME_PAGE:
      return {
        ...state,
        pageNum: action.pageNum,
      };
    case HOME_CURRENT:
      return {
        ...state,
        thisPage: action.page,
      };
    case HOME_SEARCH:
      return {
        ...state,
        homeSearch: action.search,
      };
    case HOME_APPLY_SUCCESS:
      return {
        ...state,
        applyUserData: action.result,
      };
    case HOME_INSERT_FAILD:
      if (action.result && action.result.error) {
        console.log(action.result.error);
      }
      return {
        ...state,
        applyError: action.error
      };
    case HOME_UNIQUE_SUCCESS:
      return {
        ...state,
        isUnique: action.result.isUnique
      };
    case HOME_SEARCH_SUCCESS:
      return {
        ...state,
        applyUserData: action.result,
      };

    case HOME_AUDIT_SUCCESS:
      return {
        ...state,
        applyUserData: action.result,
      };
    case HOME_INSERT_SUCCESS:
      return {
        ...state,
        insertState: action.result,
      };
    case HOME_DRAFT_SUCCESS:
      return {
        ...state,
        insertState: action.result,
      };

    case HOME_CLEARSTATE_SUCCESS:
      return {
        ...state,
        insertState: {},
      };
  }
}

export function homeOpen() {
  return {
    type: HOME_ADD_OPEN,
  };
}

export function homeClose() {
  return {
    type: HOME_ADD_CLOSE,
  };
}

export function getPageNum(pageNum) {
  return {
    type: HOME_PAGE,
    pageNum: pageNum
  };
}

export function currentPage(page) {
  return {
    type: HOME_CURRENT,
    page: page,
  };
}

export function getSearch(search) {
  return {
    type: HOME_SEARCH,
    search: search,
  };
}


export function applyUser(page) {
  return {
    types: [HOME_APPLY_LOAD, HOME_APPLY_SUCCESS, HOME_APPLY_FAILD],
    promise: (client) => client.get(`${portId}candidates?page=${page}`)
  };
}

export function insertApply(data) {
  return {
    types: [HOME_INSERT_LOAD, HOME_INSERT_SUCCESS, HOME_INSERT_FAILD],
    promise: (client) => client.post(`${portId}candidates/new`, {
      data: data
    })
  };
}

export function draftApply(data) {
  return {
    types: [HOME_DRAFT_LOAD, HOME_DRAFT_SUCCESS, HOME_DRAFT_FAIL],
    promise: (client) => client.post(`${portId}candidates/draft`, {
      data: data
    })
  };
}

export function clearInsert() {
  return {
    type: HOME_CLEARSTATE_SUCCESS,
  };
}

export function applyUnique(id) {
  return {
    types: [HOME_UNIQUE_LOAD, HOME_UNIQUE_SUCCESS, HOME_UNIQUE_FAILD],
    promise: (client) => client.get(`${portId}candidates/unique?identifier=${id}`)
  };
}

export function searchApply(keyword, page) {
  return {
    types: [HOME_SEARCH_LOAD, HOME_SEARCH_SUCCESS, HOME_SEARCH_FAIL],
    promise: (client) => client.get(`${portId}candidates/search?keyword=${keyword}&page=${page}`)
  };
}

export function applyUserAudit(key, page) {
  return {
    types: [HOME_AUDIT_LOAD, HOME_AUDIT_SUCCESS, HOME_AUDIT_FAILD],
    promise: (client) => client.get(`${portId}candidates/filter?keyword=${key}&page=${page}`)
  };
}
