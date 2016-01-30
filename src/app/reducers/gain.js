import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  const gain = state;
  switch (action.type) {
    case types.SET_GAIN:
      return action.payload;
    case types.SET_GAIN_VALUE:
      gain.gain.value = action.payload;
      return gain;
    default:
      return state;
  }
}
