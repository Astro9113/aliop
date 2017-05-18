import {portId} from '../port';

const SHOW_OPEN = 'wanglupoc/cms/project/SHOW_OPEN';
const SHOW_CLOSE = 'wanglupoc/cms/project/SHOW_CLOSE';

const PROJECT_ALLMEMBER_LOAD = 'wanglutech/cms/project/PROJECT_ALLMEMBER_LOAD';
const PROJECT_ALLMEMBER_SUCCESS = 'wanglupoc/cms/project/PROJECT_ALLMEMBER_SUCCESS';
const PROJECT_ALLMEMBER_FAIL = 'wanglupoc/cms/project/PROJECT_ALLMEMBER_FAIL';

const SEARCH_MEMBER_LOAD = 'wanglutech/cms/SEARCH_MEMBER_LOAD';
const SEARCH_MEMBER_SUCCESS = 'wanglupoc/cms/SEARCH_MEMBER_SUCCESS';
const SEARCH_MEMBER_FAIL = 'wanglupoc/cms/SEARCH_MEMBER_FAIL';

const QUERY_PROJECT_LOAD = 'wanglutech/cms/QUERY_PROJECT_LOAD';
const QUERY_PROJECT_SUCCESS = 'wanglupoc/investment/QUERY_PROJECT_SUCCESS';
const QUERY_PROJECT_FAIL = 'wanglupoc/investment/QUERY_PROJECT_FAIL';

const INSERT_PROJECT_LOAD = 'wanglutech/cms/INSERT_PROJECT_LOAD';
const INSERT_PROJECT_SUCCESS = 'wanglupoc/investment/INSERT_PROJECT_SUCCESS';
const INSERT_PROJECT_FAIL = 'wanglupoc/investment/INSERT_PROJECT_FAIL';

const PROJECT_KEYWORD = 'wanglupoc/investment/PROJECT_KEYWORD';

const PROJECT_DETAIL_LOAD = 'wanglupoc/investment/PROJECT_DETAIL_LOAD';
const PROJECT_DETAIL_SUCCESS = 'wanglupoc/investment/PROJECT_DETAIL_SUCCESS';
const PROJECT_DETAIL_FAIL = 'wanglupoc/investment/PROJECT_DETAIL_FAIL';

const CLEAR_PROJECT_DETAIL = 'wanglupoc/investment/CLEAR_PROJECT_DETAIL';

const PROJECT_UPDATE_LOAD = 'wanglupoc/investment/PROJECT_UPDATE_LOAD';
const PROJECT_UPDATE_SUCCESS = 'wanglupoc/investment/PROJECT_UPDATE_SUCCESS';
const PROJECT_UPDATE_FAIL = 'wanglupoc/investment/PROJECT_UPDATE_FAIL';

const PROJECT_PRO_LOAD = 'wanglupoc/investment/PROJECT_PRO_LOAD';
const PROJECT_PRO_SUCCESS = 'wanglupoc/investment/PROJECT_PRO_SUCCESS';
const PROJECT_PRO_FAIL = 'wanglupoc/investment/PROJECT_PRO_FAIL';

const PROJECT_PAGE = 'wanglupoc/investment/PROJECT_PAGE';

const initialState = {
  cmsShow: false,
  cmsProject: {},
  projectKeyword: '',
  theProjectDetail: {},
  theKeyword: '',
  allProjects: {data: []},
  pageNum: '0',
};

export default function cmsProject(state = initialState, action = {}) {
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
    case PROJECT_KEYWORD:
      return {
        ...state,
        theKeyword: action.theKeyword,
      };

    case QUERY_PROJECT_SUCCESS:
      return {
        ...state,
        cmsProject: action.result,
      };
    case SEARCH_MEMBER_SUCCESS:
      return {
        ...state,
        cmsProject: action.result,
      };
    case PROJECT_ALLMEMBER_SUCCESS:
      return {
        ...state,
        allProjects: action.result,
      };

    case PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        theProjectDetail: action.result,
      };
    case CLEAR_PROJECT_DETAIL:
      return {
        ...state,
        theProjectDetail: {},
      };

    case PROJECT_PAGE:
      return {
        ...state,
        pageNum: action.page,
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

export function savePage(page) {
  return {
    type: PROJECT_PAGE,
    page: page,
  };
}

export function queryProject(pageid, stage) {
  return {
    types: [QUERY_PROJECT_LOAD, QUERY_PROJECT_SUCCESS, QUERY_PROJECT_FAIL],
    promise: (client) => client.get(`${portId}projects?page=${pageid}&stage=${stage}&client=false`),
  };
}

export function searchProject(keyword, id) {
  return {
    types: [SEARCH_MEMBER_LOAD, SEARCH_MEMBER_SUCCESS, SEARCH_MEMBER_FAIL],
    promise: (client) => client.get(`${portId}projects/search?keyword=${keyword}&page=${id}`)
  };
}

export function insertProject(companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img) {
  return {
    types: [INSERT_PROJECT_LOAD, INSERT_PROJECT_SUCCESS, INSERT_PROJECT_FAIL],
    promise: (client) => client.post(`${portId}projects`, {
      data: {
        companyName: companyName,
        projectName: projectName,
        initiatedBy: initiatedBy,
        intro: intro,
        targetFunds: targetFunds,
        plannedRounds: plannedRounds,
        numStakeHolders: numStakeHolders,
        industry: industry,
        stages: stages,
        img: img,
      }
    })
  };
}

export function updateProject(id, companyName, projectName, initiatedBy, intro, targetFunds, plannedRounds, numStakeHolders, industry, stages, img) {
  return {
    types: [PROJECT_UPDATE_LOAD, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAIL],
    promise: (client) => client.put(`${portId}projects/${id}`, {
      data: {
        companyName: companyName,
        projectName: projectName,
        initiatedBy: initiatedBy,
        intro: intro,
        targetFunds: targetFunds,
        plannedRounds: plannedRounds,
        numStakeHolders: numStakeHolders,
        industry: industry,
        stages: stages,
        img: img,
      }
    })
  };
}

export function saveKeyword(module) {
  return {
    type: PROJECT_KEYWORD,
    theKeyword: module,
  };
}


export function allProject() {
  return {
    types: [PROJECT_ALLMEMBER_LOAD, PROJECT_ALLMEMBER_SUCCESS, PROJECT_ALLMEMBER_FAIL],
    promise: (client) => client.get(`${portId}members`),
  };
}


export function projectDetail(id) {
  return {
    types: [PROJECT_DETAIL_LOAD, PROJECT_DETAIL_SUCCESS, PROJECT_DETAIL_FAIL],
    promise: (client) => client.get(`${portId}projects/${id}`),
  };
}

export function clearProjectDetail() {
  return {
    type: CLEAR_PROJECT_DETAIL,
  };
}

export function prohibitProject(id) {
  return {
    types: [PROJECT_PRO_LOAD, PROJECT_PRO_SUCCESS, PROJECT_PRO_FAIL],
    promise: (client) => client.get(`${portId}projects/toggle-publish/${id}`),
  };
}
