const HOME_IMG = 'wanglupoc/home/HOME_IMG';

const initialState = {
  homeImg: '',
};

export default function header(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case HOME_IMG:
      return {
        ...state,
        homeImg: action.active,
      };
  }
}


export function chooseImg(select) {
  return {
    type: HOME_IMG,
    active: select
  };
}
