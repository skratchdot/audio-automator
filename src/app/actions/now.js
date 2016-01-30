import * as types from '../constants/ActionTypes';

export function setNow() {
  return {
    type: types.SET_NOW,
    payload: Date.now()
  };
}
