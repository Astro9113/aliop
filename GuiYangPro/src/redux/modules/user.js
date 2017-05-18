import {portId} from '../port';

const USER_PAGE = 'wanglupoc/user/USER_PAGE';
const USER_CURRENT = 'wanglupoc/user/USER_CURRENT';

const USER_ADD_OPEN = 'wanglupoc/user/USER_ADD_OPEN';
const USER_ADD_CLOSE = 'wanglupoc/user/USER_ADD_CLOSE';

const USER_CHANGE_OPEN = 'wanglupoc/user/USER_CHANGE_OPEN';
const USER_CHANGE_CLOSE = 'wanglupoc/user/USER_CHANGE_CLOSE';

const ALLUSERS_LOAD = 'redux-example/auth/ALLUSERS_LOAD';
const ALLUSERS_SUCCESS = 'redux-example/auth/ALLUSERS_SUCCESS';
const ALLUSERS_FAIL = 'redux-example/auth/ALLUSERS_FAIL';

const USER_CHANGEBYID_LOAD = 'wanglupoc/user/USER_CHANGEBYID_LOAD';
const USER_CHANGEBYID_SUCCESS = 'wanglupoc/user/USER_CHANGEBYID_SUCCESS';
const USER_CHANGEBYID_FAIL = 'wanglupoc/user/USER_CHANGEBYID_FAIL';

const USER_DETAIL_LOAD = 'wanglupoc/user/USER_DETAIL_LOAD';
const USER_DETAIL_SUCCESS = 'wanglupoc/user/USER_DETAIL_SUCCESS';
const USER_DETAIL_FAIL = 'wanglupoc/user/USER_DETAIL_FAIL';

const USER_SEARCH_LOAD = 'wanglupoc/user/USER_SEARCH_LOAD';
const USER_SEARCH_SUCCESS = 'wanglupoc/user/USER_SEARCH_SUCCESS';
const USER_SEARCH_FAIL = 'wanglupoc/user/USER_SEARCH_FAIL';

const USER_ACTIVITY_LOAD = 'wanglupoc/user/USER_ACTIVITY_LOAD';
const USER_ACTIVITY_SUCCESS = 'wanglupoc/user/USER_ACTIVITY_SUCCESS';
const USER_ACTIVITY_FAIL = 'wanglupoc/user/USER_ACTIVITY_FAIL';

const USERDETAIL_USER_UNIQUEIDENTIFIER_LOAD = 'wanglupoc/user/USERDETAIL_USER_UNIQUEIDENTIFIER_LOAD';
const USERDETAIL_USER_UNIQUEIDENTIFIER_SUCCESS = 'wanglupoc/user/USERDETAIL_USER_UNIQUEIDENTIFIER_SUCCESS';
const USERDETAIL_USER_UNIQUEIDENTIFIER_FAIL = 'wanglupoc/user/USERDETAIL_USER_UNIQUEIDENTIFIER_FAIL';

const USERDETAIL_USER_UNIQUETEL_LOAD = 'wanglupoc/user/USERDETAIL_USER_UNIQUETEL_LOAD';
const USERDETAIL_USER_UNIQUETEL_SUCCESS = 'wanglupoc/user/USERDETAIL_USER_UNIQUETEL_SUCCESS';
const USERDETAIL_USER_UNIQUETEL_FAIL = 'wanglupoc/user/USERDETAIL_USER_UNIQUETEL_FAIL';

const USER_TAMPER_OPEN = 'wanglupoc/user/USER_TAMPER_OPEN';
const USER_TAMPER_CLOSE = 'wanglupoc/user/USER_TAMPER_CLOSE';

const USERDETAIL_USER_TAMPER_LOAD = 'wanglupoc/user/USERDETAIL_USER_TAMPER_LOAD';
const USERDETAIL_USER_TAMPER_SUCCESS = 'wanglupoc/user/USERDETAIL_USER_TAMPER_SUCCESS';
const USERDETAIL_USER_TAMPER_FAIL = 'wanglupoc/user/USERDETAIL_USER_TAMPER_FAIL';

const initialState = {
  userAdd: false,
  userChange: false,
  thisPage: 0,
  pageNum: 0,

  changeid: '',

  tamperModal: false,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case USER_PAGE:
      return {
        ...state,
        pageNum: action.pageNum,
      };
    case USER_ADD_OPEN:
      return {
        ...state,
        userAdd: true,
      };
    case USER_ADD_CLOSE:
      return {
        ...state,
        userAdd: false,
      };

    case USER_CHANGE_OPEN:
      return {
        ...state,
        userChange: true,
      };
    case USER_CHANGE_CLOSE:
      return {
        ...state,
        userChange: false,
      };
    case USER_CURRENT:
      return {
        ...state,
        thisPage: action.page,
      };

    case ALLUSERS_SUCCESS:
      return {
        ...state,
        allUsers: action.result,
      };

    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        theUserDetail: action.result,
      };
    case USER_SEARCH_SUCCESS:
      return {
        ...state,
        allUsers: action.result,
      };
    case USER_ACTIVITY_SUCCESS:
      return {
        ...state,
        userActive: action.result,
      };

    case USERDETAIL_USER_UNIQUEIDENTIFIER_SUCCESS:
      return {
        ...state,
        idenUnique: action.result,
      };

    case USERDETAIL_USER_UNIQUETEL_SUCCESS:
      return {
        ...state,
        telUnique: action.result,
      };

    case USERDETAIL_USER_TAMPER_SUCCESS:
      setTimeout(()=>{
        global.dataRefreshNotifier.emit('onTamperComplete');
      }, 50);
      return {
        ...state,
        tamperState: action.result,
      };
    case USER_TAMPER_OPEN:
      return {
        ...state,
        tamperModal: true,
      };
    case USER_TAMPER_CLOSE:
      return {
        ...state,
        tamperModal: false,
      };

    case USER_CHANGEBYID_SUCCESS:
      return {
        ...state,
        changeState: action.result,
      };
  }
}

export function getPageNum(pageNum) {
  return {
    type: USER_PAGE,
    pageNum: pageNum
  };
}

export function currentPage(page) {
  return {
    type: USER_CURRENT,
    page: page,
  };
}

export function addUser() {
  return {
    type: USER_ADD_OPEN,
  };
}

export function addClose() {
  return {
    type: USER_ADD_CLOSE,
  };
}

export function changeUser() {
  return {
    type: USER_CHANGE_OPEN,
  };
}

export function changeClose() {
  return {
    type: USER_CHANGE_CLOSE,
  };
}

export function queryAllUsers(page) {
  return {
    types: [ALLUSERS_LOAD, ALLUSERS_SUCCESS, ALLUSERS_FAIL],
    promise: (client) => client.get(`${portId}users?page=${page}`)
  };
}

export function changeUserById(changeId, changeData) {
  return {
    types: [USER_CHANGEBYID_LOAD, USER_CHANGEBYID_SUCCESS, USER_CHANGEBYID_FAIL],
    promise: (client) => client.post(`${portId}users/${changeId}`, {
      data: changeData
    })
  };
}

export function getUserDetail(userid) {
  return {
    types: [USER_DETAIL_LOAD, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL],
    promise: (client) => client.get(`${portId}users/${userid}`)
  };
}

export function searchUser(keyword) {
  return {
    types: [USER_SEARCH_LOAD, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL],
    promise: (client) => client.get(`${portId}users/search?keyword=${keyword}`)
  };
}

export function toggleActivity(id) {
  return {
    types: [USER_ACTIVITY_LOAD, USER_ACTIVITY_SUCCESS, USER_ACTIVITY_FAIL],
    promise: (client) => client.get(`${portId}users/${id}/toggleActivity`)
  };
}


export function uniqueIdentifier(id) {
  return {
    types: [USERDETAIL_USER_UNIQUEIDENTIFIER_LOAD, USERDETAIL_USER_UNIQUEIDENTIFIER_SUCCESS, USERDETAIL_USER_UNIQUEIDENTIFIER_FAIL],
    promise: (client) => client.get(`${portId}users/uniqueIdentifier?identifier=${id}`)
  };
}

export function uniqueTel(id) {
  return {
    types: [USERDETAIL_USER_UNIQUETEL_LOAD, USERDETAIL_USER_UNIQUETEL_SUCCESS, USERDETAIL_USER_UNIQUETEL_FAIL],
    promise: (client) => client.get(`${portId}users/uniqueTel?tel=${id}`)
  };
}

export function queryTamper(id, data) {
  return {
    types: [USERDETAIL_USER_TAMPER_LOAD, USERDETAIL_USER_TAMPER_SUCCESS, USERDETAIL_USER_TAMPER_FAIL],
    promise: (client) => client.post(`${portId}basics/${id}/badBehavior`, {
      data: data
    })
  };
}

export function tamperOpen() {
  return {
    type: USER_TAMPER_OPEN,
  };
}

export function tamperClose() {
  return {
    type: USER_TAMPER_CLOSE,
  };
}
