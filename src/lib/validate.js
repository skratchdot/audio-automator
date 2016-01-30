import getType from 'get-object-type';

export function validateAudioContext(audioContext) {
  const validTypes = ['AudioContext', 'OfflineAudioContext'];
  const type = getType(audioContext);
  if (validTypes.indexOf(type) === -1) {
    throw new Error(`Invalid audio context type: ${type}`);
  }
}

export function validateAudioParam(audioParam) {
  const type = getType(audioParam);
  if (type !== 'AudioParam') {
    throw new Error(`Invalid audio param type: ${type}`);
  }
}
