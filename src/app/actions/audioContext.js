import * as types from '../constants/ActionTypes';

export function resumeAudioContext() {
  return {
    type: types.RESUME_AUDIO_CONTEXT,
    payload: true
  };
}

export function suspendAudioContext() {
  return {
    type: types.SUSPEND_AUDIO_CONTEXT,
    payload: true
  };
}
