const HEADER = 'wanglupoc/header/HEADER';

const initialState = {
  ishidden: 'false',
};

export default function header(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case HEADER:
      return {
        ...state,
        ishidden: action.active,
      };
  }
}


export function chooseHidden(select) {
  return {
    type: HEADER,
    active: select
  };
}
