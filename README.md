# audio-automator

[![NPM version](https://badge.fury.io/js/audio-automator.svg)](http://badge.fury.io/js/audio-automator)
[![Build Status](https://travis-ci.org/skratchdot/audio-automator.png?branch=master)](https://travis-ci.org/skratchdot/audio-automator)
[![Code Climate](https://codeclimate.com/github/skratchdot/audio-automator.png)](https://codeclimate.com/github/skratchdot/audio-automator)
[![Coverage Status](https://coveralls.io/repos/skratchdot/audio-automator/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/audio-automator?branch=master)
[![Dependency Status](https://david-dm.org/skratchdot/audio-automator.svg)](https://david-dm.org/skratchdot/audio-automator)
[![devDependency Status](https://david-dm.org/skratchdot/audio-automator/dev-status.svg)](https://david-dm.org/skratchdot/audio-automator#info=devDependencies)

[![NPM](https://nodei.co/npm/audio-automator.png)](https://npmjs.org/package/audio-automator)


## Description

A better way to change AudioParam values.

This library was created to deal with some of the issues I've encountered when
working with the WebAudio [AudioParam](http://webaudio.github.io/web-audio-api/#AudioParam)
([MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam))
automation features. The [web-audio-api](http://webaudio.github.io/web-audio-api/)
provides 6 functions for automating param values, as well as letting you set the
param.value directly:

- AudioParam.cancelScheduledValues()
- AudioParam.exponentialRampToValueAtTime()
- AudioParam.linearRampToValueAtTime()
- AudioParam.setTargetAtTime()
- AudioParam.setValueAtTime()
- AudioParam.setValueCurveAtTime()

There are however, some annoyances with the API (IMHO), so I created this
library.  For example, when using any of the 6 functions above, the param.value
does not change while automations are occurring, so you cannot inspect where in
the automation you are (you have to calculate this yourself by keeping track
of timings).  Also, when you cancel an automation, the "value" jumps back to
the value when the automation started (which may or may not be what you intended).

I've "fixed" these issues by always setting the param.value directly, and not
using the built-in web audio automation functions.  This allows me to expose
different types of automation easing functions, as well as allowing end users
to inspect automation timings and values at any time.  It also lets you schedule
new automations that just "pick up from the right spot".  Meaning you don't have
to cancel running automations if you don't want to.  Just schedule a new one,
and the most recent automation added will work correctly.

You can check out a live demo here:

- [http://projects.skratchdot.com/audio-automator/demo](http://projects.skratchdot.com/audio-automator/demo)


## Getting Started

Install the module with: `npm install audio-automator`


## Documentation

#### Basic Usage

```javascript
import AudioAutomator from 'audio-automator';

// create a context, and a gain node (which we will automate)
const audioContext = new AudioContext();
const gain = audioContext.createGain();

// create our AudioAutomator
const auto = new AudioAutomator(audioContext);

// Automate the gain node:
// This waits for 3 seconds, then starts using a `sinInOut` easing
// function to change the value of the gain node to 0.5. It will
// take 1.2 seconds to complete the automation.
auto.sinInOut(gain.gain, 0.5, 1.2, 3);
```


## Links

- [Homepage](https://github.com/skratchdot/audio-automator/)
- [Demo](http://projects.skratchdot.com/audio-automator/demo)


## License
Copyright (c) 2016 [skratchdot](http://skratchdot.com/)  
Licensed under the [MIT license](LICENSE-MIT).
