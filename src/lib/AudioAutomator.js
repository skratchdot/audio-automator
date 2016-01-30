import { validateAudioContext, validateAudioParam } from './validate';
import * as d3EaseFunctions from 'd3-ease';
import { scaleLinear } from 'd3-scale';

export const easeTypes = [
  'Linear', 'Quad', 'Cubic', 'Poly', 'Sin',
  'Exp', 'Circle', 'Bounce', 'Back', 'Elastic'
];
export const inOutTypes = ['In', 'Out', 'InOut'];
export const displayNames = [];
export const methodNames = [];

// build names
easeTypes.forEach((ease) => {
  displayNames.push(ease);
  methodNames.push(`${ease.toLowerCase()}InOut`);
  inOutTypes.forEach((inOut) => {
    displayNames.push(`${ease}${inOut}`);
    methodNames.push(`${ease.toLowerCase()}${inOut}`);
  });
});

const coerceDelay = function (value) {
  return Number.isFinite(value) && value > 0 ? value : 0;
};

class Automator {
  constructor(audioContext, easeFn, audioParam, targetValue, duration, delay, startValue) {
    validateAudioContext(audioContext);
    this._audioContext = audioContext;
    this._easeFn = easeFn;
    this._audioParam = audioParam;
    this._targetValue = targetValue;
    this._duration = duration;
    this._delay = coerceDelay(delay);
    this._timeCreationEpoch = Date.now();
    this._timeCreation = this._audioContext.currentTime;
    this._timeStart = this._timeCreation + this._delay;
    this._timeEnd = this._timeStart + duration;
    this._valueCreation = this._audioParam.value;
    this._valueStart = Number.isFinite(startValue) ? startValue : null;
    this._valueEnd = targetValue;
    this._valueCurrent = null;
    this._normalizeTime = null;
    this._denormalizeValue = null;
  }
}

export default class AudioAutomator {
  constructor(audioContext) {
    validateAudioContext(audioContext);
    this._audioContext = audioContext;
    this._automatorMap = new Map();
    this._cancelTimeMap = new Map();
    this._scriptProcessor = this._audioContext.createScriptProcessor(256, 1, 1);
    this._scriptProcessor.addEventListener('audioprocess', this.onAudioProcess.bind(this));
    this._scriptProcessor.connect(this._audioContext.destination);
  }
  destroy() {
    this._scriptProcessor.removeEventListener('audioprocess', this.onAudioProcess.bind(this));
    this._scriptProcessor.disconnect(this._audioContext.destination);
  }
  onAudioProcess() {
    const self = this;
    const currentTime = this._audioContext.currentTime;
    const cancelledParams = [];

    // cancel any existing automations
    self._cancelTimeMap.forEach((value, key) => {
      if (value <= currentTime) {
        cancelledParams.push(key);
        self._cancelTimeMap.delete(key);
        self._automatorMap.delete(key);
      }
    });

    // run existing automations
    self._automatorMap.forEach((automations, key) => {
      automations = automations.map((a) => {
        if (!Number.isFinite(a._valueStart)) {
          a._valueStart = a._audioParam.value;
        }
        if (currentTime >= a._timeStart) {
          if (a._normalizeTime !== 'function') {
            a._normalizeTime = scaleLinear()
              .domain([a._timeStart, a._timeEnd])
              .range([0, 1]);
            a._normalizeTime.clamp(true);
          }
          if (a._denormalizeValue !== 'function') {
            a._denormalizeValue = scaleLinear()
              .domain([0, 1])
              .range([a._valueStart, a._valueEnd]);
          }
          const normalizedTime = a._normalizeTime(currentTime);
          const easedTime = a._easeFn(normalizedTime);
          const easedValue = a._denormalizeValue(easedTime);
          if (Number.isFinite(easedValue)) {
            a._audioParam.value = easedValue;
          } else {
            /*eslint-disable */
            console.error(
              'Eased value is not finite.',
              'automation:', a,
              'normalizedTime:', normalizedTime,
              'easedTime:', easedTime,
              'easedValue:', easedValue
            );
            /*eslint-enable */
          }
        }
        return a;
      }).filter((a) => {
        return a._timeEnd > currentTime;
      });

      // update automations array for current key
      if (automations.length) {
        self._automatorMap.set(key, automations);
      } else {
        self._automatorMap.delete(key);
      }
    });

  }
  setValue(audioParam, value) {
    validateAudioParam(audioParam);
    this.cancel(audioParam, 0);
    audioParam.value = value;
    return audioParam;
  }
  cancel(audioParam, delay) {
    validateAudioParam(audioParam);
    delay = coerceDelay(delay);
    const targetCancelTime = this._audioContext.currentTime + delay;
    const cancelTime = this._cancelTimeMap.get(audioParam);
    if (!Number.isFinite(cancelTime) || cancelTime > targetCancelTime) {
      this._cancelTimeMap.set(audioParam, targetCancelTime);
    }
    return audioParam;
  }
}

// setup easing methods
displayNames.forEach((name) => {
  const method = `${name.substring(0, 1).toLowerCase()}${name.substring(1)}`;
  const d3Method = `ease${name}`;
  AudioAutomator.prototype[method] = function (audioParam, targetValue, duration, delay) {
    validateAudioParam(audioParam);
    const automator = new Automator(
      this._audioContext, d3EaseFunctions[d3Method],
      audioParam, targetValue, duration, delay
    );
    const automators = this._automatorMap.get(audioParam) || [];
    automators.push(automator);
    this._automatorMap.set(audioParam, automators);
    return audioParam;
  };
});
