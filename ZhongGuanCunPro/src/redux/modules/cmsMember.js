import {portId} from '../port';

const SHOW_OPEN = 'wanglupoc/cms/SHOW_OPEN';
const SHOW_CLOSE = 'wanglupoc/cms/SHOW_CLOSE';

const SEARCH_MEMBER_LOAD = 'wanglutech/cms/SEARCH_MEMBER_LOAD';
const SEARCH_MEMBER_SUCCESS = 'wanglupoc/investment/SEARCH_MEMBER_SUCCESS';
const SEARCH_MEMBER_FAIL = 'wanglupoc/investment/SEARCH_MEMBER_FAIL';

const QUERY_MEMBER_LOAD = 'wanglutech/cms/QUERY_MEMBER_LOAD';
const QUERY_MEMBER_SUCCESS = 'wanglupoc/investment/QUERY_MEMBER_SUCCESS';
const QUERY_MEMBER_FAIL = 'wanglupoc/investment/QUERY_MEMBER_FAIL';

const INSERT_MEMBER_LOAD = 'wanglutech/cms/INSERT_MEMBER_LOAD';
const INSERT_MEMBER_SUCCESS = 'wanglupoc/investment/INSERT_MEMBER_SUCCESS';
const INSERT_MEMBER_FAIL = 'wanglupoc/investment/INSERT_MEMBER_FAIL';

const MEMBER_KEYWORD = 'wanglupoc/investment/MEMBER_KEYWORD';

const MEMBER_DETAIL_LOAD = 'wanglupoc/investment/MEMBER_DETAIL_LOAD';
const MEMBER_DETAIL_SUCCESS = 'wanglupoc/investment/MEMBER_DETAIL_SUCCESS';
const MEMBER_DETAIL_FAIL = 'wanglupoc/investment/MEMBER_DETAIL_FAIL';

const CLEAR_MEMBER_DETAIL = 'wanglupoc/investment/CLEAR_MEMBER_DETAIL';

const MEMBER_UPDATE_LOAD = 'wanglupoc/investment/MEMBER_UPDATE_LOAD';
const MEMBER_UPDATE_SUCCESS = 'wanglupoc/investment/MEMBER_UPDATE_SUCCESS';
const MEMBER_UPDATE_FAIL = 'wanglupoc/investment/MEMBER_UPDATE_FAIL';

const MEMBER_PRO_LOAD = 'wanglupoc/investment/MEMBER_PRO_LOAD';
const MEMBER_PRO_SUCCESS = 'wanglupoc/investment/MEMBER_PRO_SUCCESS';
const MEMBER_PRO_FAIL = 'wanglupoc/investment/MEMBER_PRO_FAIL';

const MEMBER_PAGE = 'wanglupoc/investment/MEMBER_PAGE';

const MEMBER_VERSION = 'wanglutech/cmsMember/MEMBER_VERSION';

const MEMBER_UPLOAD_LOAD = 'wanglupoc/investment/MEMBER_UPLOAD_LOAD';
const MEMBER_UPLOAD_SUCCESS = 'wanglupoc/investment/MEMBER_UPLOAD_SUCCESS';
const MEMBER_UPLOAD_FAIL = 'wanglupoc/investment/MEMBER_UPLOAD_FAIL';

const MEMBER_UPLOAD_FILE = 'wanglupoc/investment/MEMBER_UPLOAD_FILE';

const initialState = {
  cmsShow: false,
  cmsMember: {},
  memberKeyword: '',
  theMemberDetail: {},
  theKeyword: '',
  pageNum: '0',

  isVersion: 'false',
  memberUrl: {url: ''},
};

export default function test(state = initialState, action = {}) {
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
    case SEARCH_MEMBER_SUCCESS:
      return {
        ...state,
        cmsMember: action.result,
      };

    case QUERY_MEMBER_SUCCESS:
      return {
        ...state,
        cmsMember: action.result,
      };
    case MEMBER_KEYWORD:
      return {
        ...state,
        theKeyword: action.theKeyword,
      };
    case MEMBER_DETAIL_SUCCESS:
      return {
        ...state,
        theMemberDetail: action.result,
      };
    case MEMBER_UPLOAD_SUCCESS:
      return {
        ...state,
        memberUrl: action.result,
      };
    case CLEAR_MEMBER_DETAIL:
      return {
        ...state,
        theMemberDetail: {},
      };
    case MEMBER_PAGE:
      return {
        ...state,
        pageNum: action.page,
      };
    case MEMBER_VERSION:
      return {
        ...state,
        isVersion: action.state,
      };

    case MEMBER_UPLOAD_FILE:
      return {
        ...state,
        fileName: action.fileName,
      };
  }
}


export function openCMS() {
  return {
    type: SHOW_OPEN,
  };
}

export function closeCMS() {
  return {
    type: SHOW_CLOSE,
  };
}

export function saveKeyword(module) {
  return {
    type: MEMBER_KEYWORD,
    theKeyword: module,
  };
}

export function savePage(page) {
  return {
    type: MEMBER_PAGE,
    page: page,
  };
}

export function queryMember(pageid) {
  return {
    types: [QUERY_MEMBER_LOAD, QUERY_MEMBER_SUCCESS, QUERY_MEMBER_FAIL],
    promise: (client) => client.get(`${portId}members?page=${pageid}&client=false`),
  };
}

export function searchMember(keyword, id) {
  return {
    types: [SEARCH_MEMBER_LOAD, SEARCH_MEMBER_SUCCESS, SEARCH_MEMBER_FAIL],
    promise: (client) => client.get(`${portId}members/search?keyword=${keyword}&page=${id}`)
  };
}

export function insertMember(title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreateOn, address, phone, img) {
  return {
    types: [INSERT_MEMBER_LOAD, INSERT_MEMBER_SUCCESS, INSERT_MEMBER_FAIL],
    promise: (client) => client.post(`${portId}members`, {
      data: {
        title: title,
        platform: platform,
        website: website,
        intro: intro,
        legalRepresentative: legalRepresentative,
        stakeHolders: stakeHolders,
        managementTeam: managementTeam,
        webRef: webRef,
        webCreatedOn: webCreateOn,
        address: address,
        phone: phone,
        img: img,
      }
    })
  };
}

export function memberDetail(id) {
  return {
    types: [MEMBER_DETAIL_LOAD, MEMBER_DETAIL_SUCCESS, MEMBER_DETAIL_FAIL],
    promise: (client) => client.get(`${portId}members/${id}`),
  };
}
export function clearMemberDetail() {
  return {
    type: CLEAR_MEMBER_DETAIL,
  };
}

export function updateMember(id, title, platform, website, intro, legalRepresentative, stakeHolders, managementTeam, webRef, webCreateOn, address, phone, img) {
  return {
    types: [MEMBER_UPDATE_LOAD, MEMBER_UPDATE_SUCCESS, MEMBER_UPDATE_FAIL],
    promise: (client) => client.put(`${portId}members/${id}`, {
      data: {
        title: title,
        platform: platform,
        website: website,
        intro: intro,
        legalRepresentative: legalRepresentative,
        stakeHolders: stakeHolders,
        managementTeam: managementTeam,
        webRef: webRef,
        webCreatedOn: webCreateOn,
        address: address,
        phone: phone,
        img: img,
      }
    })
  };
}

export function prohibitMember(id) {
  return {
    types: [MEMBER_PRO_LOAD, MEMBER_PRO_SUCCESS, MEMBER_PRO_FAIL],
    promise: (client) => client.get(`${portId}members/toggle-publish/${id}`),
  };
}

export function changeVersion(state) {
  return {
    type: MEMBER_VERSION,
    state: state,
  };
}

export function imgeUpload(file) {
  return {
    types: [MEMBER_UPLOAD_LOAD, MEMBER_UPLOAD_SUCCESS, MEMBER_UPLOAD_FAIL],
    promise: (client) => client.post(`${portId}upload`, {
      data: file
    })
  };
}

export function saveFile(fileName) {
  return {
    type: MEMBER_UPLOAD_FILE,
    fileName: fileName,
  };
}
