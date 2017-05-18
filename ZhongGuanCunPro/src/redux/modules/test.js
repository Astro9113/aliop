import {portId} from '../port';

const MODAL_OPEN = 'wanglupoc/poe/proof/MODAL_OPEN';
const MODAL_CLOSE = 'wanglupoc/poe/proof/MODAL_CLOSE';

const MODAL_CLICK = 'wanglupoc/poe/proof/MODAL_CLICK';
const MODAL_LOADING = 'wanglupoc/poe/proof/MODAL_LOADING';
const MODAL_UNCLICK = 'wanglupoc/poe/proof/MODAL_UNCLICK';

const SHARE_OPEN = 'wanglupoc/investment/SHARE_OPEN';
const SHARE_CLOSE = 'wanglupoc/investment/SHARE_CLOSE';


const INVEST_LOAD = 'wanglupoc/investment/INVEST_LOAD';
const INVEST_SUCCESS = 'wanglupoc/investment/INVEST_SUCCESS';
const INVEST_FAIL = 'wanglupoc/investment/INVEST_FAIL';

const initialState = {
  isopen: false,
  isclick: false,
  isloading: false,

  isshare: true,

  invest: {},
};

export default function test(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case MODAL_OPEN:
      return {
        isopen: true
      };
    case MODAL_CLOSE:
      return {
        isopen: false
      };

    case MODAL_UNCLICK:
      return {
        isclick: false,
        isloading: false,
      };

    case MODAL_LOADING:
      return {
        isclick: false,
        isloading: true
      };
    case MODAL_CLICK:
      return {
        isclick: true,
        isloading: false,
      };

    case SHARE_OPEN:
      return {
        isshare: true
      };

    case SHARE_CLOSE:
      return {
        isshare: false
      };

    case INVEST_SUCCESS:
      return {
        invest: action.result,
      };
  }
}

export function modalClose() {
  return {
    type: MODAL_CLOSE,
  };
}

export function modalOpen() {
  return {
    type: MODAL_OPEN,
  };
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

export function shareOpen() {
  return {
    type: SHARE_OPEN,
  };
}

export function shareClose() {
  return {
    type: SHARE_CLOSE,
  };
}

export function queryInvest() {
  return {
    types: [INVEST_LOAD, INVEST_SUCCESS, INVEST_FAIL],
    promise: (client) => client.get(`${portId}investors?page=1`)
  };
}
