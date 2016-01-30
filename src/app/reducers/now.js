import * as types from '../constants/ActionTypes';

export default function (state = Date.now(), action) {
  switch (action.type) {
    case types.SET_NOW:
      return action.payload;
    default:
      return state;
  }
}
