import * as types from '../constants/ActionTypes';

export function setGainValue(value) {
  return {
    type: types.SET_GAIN_VALUE,
    payload: value
  };
}
