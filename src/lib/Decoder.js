import { validateAudioContext } from './validate';

export default class Decoder {
  constructor(audioContext) {
    validateAudioContext(audioContext);
    this._audioContext = audioContext;
  }
  decodeUrl(url) {
    const self = this;
    return new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function () {
        const audioData = request.response;
        self._audioContext.decodeAudioData(audioData, function (buffer) {
          resolve(buffer);
        }, reject);
      };
      request.onerror = reject;
      request.send();
    });
  }
}
