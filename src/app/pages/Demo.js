import React, { Component } from 'react';
import { Button, ButtonGroup, Jumbotron, Row, Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import raf from 'raf';
import { resumeAudioContext, suspendAudioContext } from '../actions/audioContext';
import { setNow } from '../actions/now';
import { loadUrl } from '../actions/source';
import { easeTypes, inOutTypes } from '../../lib/AudioAutomator';

class Demo extends Component {
  componentDidMount() {
    const { dispatch, source } = this.props;
    this._isMounted = true;
    raf(this.onRequestAnimationFrame.bind(this));
    dispatch(suspendAudioContext());
    if (source.buffer === null) {
      dispatch(loadUrl('http://projects.skratchdot.com/audio-files/loops/loop304.mp3'));
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    this._isMounted = false;
    dispatch(suspendAudioContext());
  }
  onRequestAnimationFrame() {
    if (this._isMounted) {
      const { dispatch } = this.props;
      dispatch(setNow());
      raf(this.onRequestAnimationFrame.bind(this));
    }
  }
  render() {
    const { dispatch, audioAutomator, audioContext, gain, now } = this.props;
    const { state } = audioContext;
    const duration = 1;
    const delay = 0;
    const cancelEvents = [];
    const automatorEvents = [];
    const automatorColumns = [
      '_targetValue', 'duration', '_delay',
      '_valueCreation', '_valueStart', '_valueEnd', '_valueCurrent',
      '_timeCreationEpoch', '_timeCreation', '_timeStart', '_timeEnd'
    ];
    [['gain', gain.gain]].forEach((paramTypes) => {
      const [ name, param ] = paramTypes;
      const cancel = audioAutomator._cancelTimeMap.get(param);
      const automator = audioAutomator._automatorMap.get(param);
      if (cancel) {
        cancelEvents.push(
          <div>
            Cancel "{name}" at audioContext.currentTime: {cancel}
          </div>
        );
      }
      if (automator) {
        const events = [];
        automator.forEach((event) => {
          events.push(
            <tr>
              {automatorColumns.map((key) => {
                return (
                  <td>{event[key]}</td>
                );
              })}
            </tr>
          );
        });
        automatorEvents.push(
          <div style={{overflow: 'auto'}}>
            {name}:
            <Table>
              <thead>
                <tr>
                  {automatorColumns.map((key) => {
                    return (
                      <th>{key.replace('_', '')}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {events}
              </tbody>
            </Table>
          </div>
        );
      }
    });
    return (
      <div>
        <Jumbotron>
          <Row>
            <Col md={3}>
              <div>
                <Button
                  onClick={() => dispatch(suspendAudioContext())}
                  disabled={state === 'suspended'}
                >Stop</Button>
                <Button
                  onClick={() => dispatch(resumeAudioContext())}
                  disabled={state !== 'suspended'}
                >Play</Button>
              </div>
              <hr />
              <div>
                Context Time: {audioContext.currentTime}
                <br />
                Time: {now}
              </div>
              <hr />
              <div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.00001"
                  value={gain.gain.value}
                  onInput={(e) => {
                    const newValue = parseFloat(e.target.value);
                    audioAutomator.setValue(gain.gain, newValue);
                  }}
                />
                Gain: {gain.gain.value}
              </div>
            </Col>
            <Col md={9}>
              <Row>
                {[0, 1].map((targetValue) => {
                  return (
                    <Col md={6}>
                      Target Value: {targetValue}
                      {easeTypes.map((ease) => {
                        return (
                          <Row>
                            <Col md={12}>
                                <ButtonGroup justified>
                                  {inOutTypes.map((inOut) => {
                                    const method = ease.toLowerCase() + inOut;
                                    return (
                                      <Button
                                        style={{width: '33%'}}
                                        onClick={() => {
                                          audioAutomator[method](
                                            gain.gain,
                                            targetValue,
                                            duration,
                                            delay
                                          );
                                        }}>
                                        {method}
                                      </Button>
                                    );
                                  })}
                                </ButtonGroup>
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col md={12}>
                  <Button
                    style={{width: '100%'}}
                    onClick={() => audioAutomator.cancel(gain.gain)}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <strong>Queued Cancelations:</strong>
            {cancelEvents}
          </Row>
          <Row>
            <strong>Queued Automations:</strong>
            {automatorEvents}
          </Row>
        </Jumbotron>
      </div>
    );
  }
}

export default connect(function (state) {
  return {
    audioAutomator: state.audioAutomator,
    audioContext: state.audioContext,
    gain: state.gain,
    now: state.now,
    source: state.source
  };
})(Demo);
