const MODAL_OPEN = 'wanglupoc/popup/MODAL_OPEN';
const MODAL_CLOSE = 'wanglupoc/popup/MODAL_CLOSE';

const MODAL_SETCONTENT = 'wanglupoc/popup/MODAL_SETCONTENT';

const initialState = {
  isopen: false,
};

export default function test(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case MODAL_OPEN:
      return {
        ...state,
        isopen: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        isopen: false
      };
    case MODAL_SETCONTENT:
      return {
        ...state,
        alertContent: action.payload
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

export function setContent(desc) {
  return {
    type: MODAL_SETCONTENT,
    payload: desc
  };
}
