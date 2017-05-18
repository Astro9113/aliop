import {portId} from '../port';

const PROHECT_LOAD = 'wanglupoc/project/PROJECT_TOTAL';
const PROHECT_SUCCESS = 'wanglupoc/project/PROJECT_SUCCESS';
const PROHECT_FAIL = 'wanglupoc/project/PROJECT_FAIL';

const PROJECT_PAGE = 'wanglupoc/project/PROJECT_PAGE';

const PROJECT_STAGE = 'wanglupoc/project/PROJECT_STAGE';

const PROJECT_SEARCH_LOAD = 'wanglupoc/project/PROJECT_SEARCH_LOAD';
const PROJECT_SEARCH_SUCCESS = 'wanglupoc/project/PROJECT_SEARCH_SUCCESS';
const PROJECT_SEARCH_FAIL = 'wanglupoc/project/PROJECT_SEARCH_FAIL';

const PROJECT_KEYWORD = 'wanglupoc/project/PROJECT_KEYWORD';

const initialState = {
  projectData: {
    data: [],
  },
  count: 0,
  stage: 'A',
  theKeyword: '',
};

export default function investment(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case PROHECT_SUCCESS:
      return {
        ...state,
        projectData: action.result,
      };
    case PROJECT_PAGE:
      return {
        ...state,
        count: action.payload,
      };

    case PROJECT_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case PROJECT_SEARCH_SUCCESS:
      return {
        ...state,
        projectData: action.result,
      };
    case PROJECT_KEYWORD:
      return {
        ...state,
        theKeyword: action.keyword,
      };
  }
}

export function saveKeyword(keyword) {
  return {
    type: PROJECT_KEYWORD,
    keyword: keyword,
  };
}

export function queryProject(id, stage) {
  return {
    types: [PROHECT_LOAD, PROHECT_SUCCESS, PROHECT_FAIL],
    promise: (client) => client.get(`${portId}projects?page=${id}&stage=${stage}&client=true`)
  };
}

export function selectPage(page) {
  return {
    type: PROJECT_PAGE,
    payload: page
  };
}

export function selectStage(stage) {
  return {
    type: PROJECT_STAGE,
    stage: stage
  };
}

export function searchProject(keyword, page) {
  return {
    types: [PROJECT_SEARCH_LOAD, PROJECT_SEARCH_SUCCESS, PROJECT_SEARCH_FAIL],
    promise: (client) => client.get(`${portId}projects/search?keyword=${keyword}&page=${page}`)
  };
}
