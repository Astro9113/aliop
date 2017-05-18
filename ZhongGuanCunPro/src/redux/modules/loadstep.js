const STEP_DONE = 'wanglupoc/loadstep/STEP_DONE';

const initialState = {
  thestep: '',
};

export default function loadStep(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case STEP_DONE:
      return {
        thestep: action.payload
      };
  }
}

export function myStep(step) {
  return {
    type: STEP_DONE,
    payload: step
  };
}
