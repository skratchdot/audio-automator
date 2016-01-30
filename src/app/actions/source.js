import * as types from '../constants/ActionTypes';
import Decoder from '../../lib/Decoder';

export function loadUrl(url) {
  return (dispatch, getState) => {
    const { audioContext } = getState();
    const decoder = new Decoder(audioContext);
    decoder.decodeUrl(url).then(function (buffer) {
      dispatch({
        type: types.SET_SOURCE_BUFFER,
        payload: buffer
      });
    });
  };
}
