import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  const audioContext = state;
  switch (action.type) {
    case types.SET_AUDIO_CONTEXT:
      return action.payload;
    case types.RESUME_AUDIO_CONTEXT:
      audioContext.resume();
      return audioContext;
    case types.SUSPEND_AUDIO_CONTEXT:
      audioContext.suspend();
      return audioContext;
    default:
      return state;
  }
}
