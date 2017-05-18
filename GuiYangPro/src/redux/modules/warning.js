import {portId} from '../port';

const WARNING_INFO_LOAD = 'wanglupoc/warning/WARNING_INFO_LOAD';
const WARNING_INFO_SUCCESS = 'wanglupoc/warning/WARNING_INFO_SUCCESS';
const WARNING_INFO_FAIL = 'wanglupoc/warning/WARNING_INFO_FAIL';

const initialState = {
  warningData: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case WARNING_INFO_SUCCESS:
      return {
        ...state,
        warningData: action.result,
      };
  }
}


export function queryWarningInfo() {
  return {
    types: [WARNING_INFO_LOAD, WARNING_INFO_SUCCESS, WARNING_INFO_FAIL],
    promise: (client) => client.get(`${portId}statistics`)
  };
}
