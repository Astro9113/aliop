import {portId} from '../port';

const SHOW_OPEN = 'wanglupoc/cms/SHOW_OPEN';
const SHOW_CLOSE = 'wanglupoc/cms/SHOW_CLOSE';

const SEARCH_INVEST_LOAD = 'wanglutech/cms/SEARCH_INVEST_LOAD';
const SEARCH_INVEST_SUCCESS = 'wanglupoc/investment/SEARCH_INVEST_SUCCESS';
const SEARCH_INVEST_FAIL = 'wanglupoc/investment/SEARCH_INVEST_FAIL';

const QUERY_INVEST_LOAD = 'wanglutech/cms/QUERY_INVEST_LOAD';
const QUERY_INVEST_SUCCESS = 'wanglupoc/investment/QUERY_INVEST_SUCCESS';
const QUERY_INVEST_FAIL = 'wanglupoc/investment/QUERY_INVEST_FAIL';

const INSERT_INVEST_LOAD = 'wanglutech/cms/INSERT_INVEST_LOAD';
const INSERT_INVEST_SUCCESS = 'wanglupoc/investment/INSERT_INVEST_SUCCESS';
const INSERT_INVEST_FAIL = 'wanglupoc/investment/INSERT_INVEST_FAIL';

const INVEST_KEYWORD = 'wanglupoc/investment/INVEST_KEYWORD';

const INVEST_DETAIL_LOAD = 'wanglupoc/investment/INVEST_DETAIL_LOAD';
const INVEST_DETAIL_SUCCESS = 'wanglupoc/investment/INVEST_DETAIL_SUCCESS';
const INVEST_DETAIL_FAIL = 'wanglupoc/investment/INVEST_DETAIL_FAIL';

const CLEAR_DETAIL = 'wanglupoc/investment/CLEAR_DETAIL';

const INVEST_UPDATE_LOAD = 'wanglupoc/investment/INVEST_UPDATE_LOAD';
const INVEST_UPDATE_SUCCESS = 'wanglupoc/investment/INVEST_UPDATE_SUCCESS';
const INVEST_UPDATE_FAIL = 'wanglupoc/investment/INVEST_UPDATE_FAIL';

const INVEST_PRO_LOAD = 'wanglupoc/investment/INVEST_PRO_LOAD';
const INVEST_PRO_SUCCESS = 'wanglupoc/investment/INVEST_PRO_SUCCESS';
const INVEST_PRO_FAIL = 'wanglupoc/investment/INVEST_PRO_FAIL';

const INVEST_PAGE = 'wanglupoc/investment/INVEST_PAGE';

const initialState = {
  cmsShow: false,
  cmsInvest: {},
  theKeyword: '',
  theInvestDetail: {},
  pageNum: '0',
};

export default function cmsInvest(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;

    case SHOW_OPEN:
      return {
        ...state,
        cmsShow: true,
      };

    case SHOW_CLOSE:
      return {
        ...state,
        cmsShow: false,
      };

    case INVEST_PAGE:
      return {
        ...state,
        pageNum: action.page,
      };

    case SEARCH_INVEST_SUCCESS:
      return {
        ...state,
        cmsInvest: action.result,
      };

    case QUERY_INVEST_SUCCESS:
      return {
        ...state,
        cmsInvest: action.result,
      };

    case INSERT_INVEST_LOAD:
      return {
        ...state,
        insertInvest: true
      };
    case INSERT_INVEST_SUCCESS:
      if (action.result.error) {
        return {
          ...state,
          insertInvest: false,
          insertInvestError: action.result.error
        };
      }
      return {
        ...state,
        insertInvest: false,
      };

    case INSERT_INVEST_FAIL:
      return {
        ...state,
        insertInvest: false,
        loginError: action.error
      };

    case INVEST_KEYWORD:
      return {
        ...state,
        theKeyword: action.theKeyword,
      };
    case INVEST_DETAIL_SUCCESS:
      return {
        ...state,
        theInvestDetail: action.result,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        theInvestDetail: {},
      };
  }
}

export function openCMS() {
  return {
    type: SHOW_OPEN,
  };
}

export function saveKeyword(module) {
  return {
    type: INVEST_KEYWORD,
    theKeyword: module,
  };
}

export function closeCMS() {
  return {
    type: SHOW_CLOSE,
  };
}

export function savePage(page) {
  return {
    type: INVEST_PAGE,
    page: page,
  };
}

export function searchInvest(keyword, id) {
  return {
    types: [SEARCH_INVEST_LOAD, SEARCH_INVEST_SUCCESS, SEARCH_INVEST_FAIL],
    promise: (client) => client.get(`${portId}investors/search?keyword=${keyword}&page=${id}`)
  };
}

export function queryInvest(id, invest) {
  return {
    types: [QUERY_INVEST_LOAD, QUERY_INVEST_SUCCESS, QUERY_INVEST_FAIL],
    promise: (client) => client.get(`${portId}investors?page=${id}&cate=${invest}&client=false`),
  };
}

export function insertInvest(cate, title, introduction, cases, img) {
  return {
    types: [INSERT_INVEST_LOAD, INSERT_INVEST_SUCCESS, INSERT_INVEST_FAIL],
    promise: (client) => client.post(`${portId}investors`, {
      data: {
        cate: cate,
        title: title,
        introduction: introduction,
        cases: cases,
        img: img,
      }
    })
  };
}

export function investDetail(id) {
  return {
    types: [INVEST_DETAIL_LOAD, INVEST_DETAIL_SUCCESS, INVEST_DETAIL_FAIL],
    promise: (client) => client.get(`${portId}investors/${id}`),
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function updateInvest(id, cate, title, introduction, cases, img) {
  return {
    types: [INVEST_UPDATE_LOAD, INVEST_UPDATE_SUCCESS, INVEST_UPDATE_FAIL],
    promise: (client) => client.put(`${portId}investors/${id}`, {
      data: {
        cate: cate,
        title: title,
        introduction: introduction,
        cases: cases,
        img: img,
      }
    })
  };
}

export function prohibit(id) {
  return {
    types: [INVEST_PRO_LOAD, INVEST_PRO_SUCCESS, INVEST_PRO_FAIL],
    promise: (client) => client.get(`${portId}investors/toggle-publish/${id}`),
  };
}
