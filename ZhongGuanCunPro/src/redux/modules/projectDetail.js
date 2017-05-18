import {portId} from '../port';

const MODAL_CLICK = 'wanglupoc/project/detail/MODAL_CLICK';
const MODAL_LOADING = 'wanglupoc/project/detail/MODAL_LOADING';
const MODAL_UNCLICK = 'wanglupoc/project/detail/MODAL_UNCLICK';

const DETAIL_LOAD = 'wanglupoc/project/DETAIL_LOAD';
const DETAIL_SUCCESS = 'wanglupoc/project/DETAIL_SUCCESS';
const DETAIL_FAIL = 'wanglupoc/project/DETAIL_FAIL';


const initialState = {
  isclick: false,
  isloading: false,
  theDetail: {},
};

export default function projectDetail(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case MODAL_UNCLICK:
      return {
        ...state,
        isclick: false,
        isloading: false,
      };

    case MODAL_LOADING:
      return {
        ...state,
        isclick: false,
        isloading: true
      };
    case MODAL_CLICK:
      return {
        ...state,
        isclick: true,
        isloading: false,
      };
    case DETAIL_SUCCESS:
      return {
        ...state,
        theDetail: action.result,
      };

  }
}

export function modalUnclick() {
  return {
    type: MODAL_UNCLICK,
  };
}

export function modalClick() {
  return {
    type: MODAL_CLICK,
  };
}

export function modalLoading() {
  return {
    type: MODAL_LOADING,
  };
}

export function projectdetail(id) {
  return {
    types: [DETAIL_LOAD, DETAIL_SUCCESS, DETAIL_FAIL],
    promise: (client) => client.get(`${portId}/projects/${id}`)
  };
}


