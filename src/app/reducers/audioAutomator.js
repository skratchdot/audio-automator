import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  switch (action.type) {
    case types.SET_AUDIO_AUTOMATOR:
      return action.payload;
    default:
      return state;
  }
}
