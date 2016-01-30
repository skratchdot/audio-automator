import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  const source = state;
  switch (action.type) {
    case types.SET_SOURCE:
      return action.payload;
    case types.SET_SOURCE_BUFFER:
      source.buffer = action.payload;
      source.loop = true;
      source.start();
      return source;
    default:
      return state;
  }
}
