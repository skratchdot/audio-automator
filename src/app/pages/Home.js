import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="text-center">
          <h1 className="title">
            audio-automator
            <br />
            <small>A better way to change AudioParam values</small>
          </h1>
          <p>
            To find out more about this library, please visit the
            &nbsp;
            <a href="/audio-automator/about">
              About Page
            </a>.
            You can also log feature requests and bugs on the
            &nbsp;
            <a href="https://github.com/skratchdot/audio-automator/issues">
              Github Issues Page
            </a>.
            To check out a demo off the library in action, please visit the
            &nbsp;
            <a href="/audio-automator/demo">
              Demo Page
            </a>.
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default connect()(Home);
