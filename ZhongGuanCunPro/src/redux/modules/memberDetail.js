import {portId} from '../port';

const MEMBERDETAIL_CLICK = 'wanglupoc/member/detail/MODAL_CLICK';
const MEMBERDETAIL_LOADING = 'wanglupoc/member/detail/MODAL_LOADING';
const MEMBERDETAIL_UNCLICK = 'wanglupoc/member/detail/MODAL_UNCLICK';

const MEMBERDETAIL_LOAD = 'wanglupoc/member/DETAIL_LOAD';
const MEMBERDETAIL_SUCCESS = 'wanglupoc/member/DETAIL_SUCCESS';
const MEMBERDETAIL_FAIL = 'wanglupoc/member/DETAIL_FAIL';

const initialState = {
  isclick: false,
  isloading: false,
  theDetail: {},
};

export default function memberDetail(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case MEMBERDETAIL_UNCLICK:
      return {
        ...state,
        isclick: false,
        isloading: false,
      };

    case MEMBERDETAIL_LOADING:
      return {
        ...state,
        isclick: false,
        isloading: true
      };
    case MEMBERDETAIL_CLICK:
      return {
        ...state,
        isclick: true,
        isloading: false,
      };
    case MEMBERDETAIL_SUCCESS:
      return {
        ...state,
        theDetail: action.result,
      };
  }
}

export function modalUnclick() {
  return {
    type: MEMBERDETAIL_UNCLICK,
  };
}

export function modalClick() {
  return {
    type: MEMBERDETAIL_CLICK,
  };
}

export function modalLoading() {
  return {
    type: MEMBERDETAIL_LOADING,
  };
}

export function memberdetail(id) {
  return {
    types: [MEMBERDETAIL_LOAD, MEMBERDETAIL_SUCCESS, MEMBERDETAIL_FAIL],
    promise: (client) => client.get(`${portId}members/${id}`)
  };
}
