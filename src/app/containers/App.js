import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import GithubCorner from 'react-github-corner';
import pathGet from 'object-path-get';
import DevTools from './DevTools';
import Header from '../components/Header';
import Footer from '../components/Footer';
import stringToCssName from '../helpers/stringToCssName';

class App extends Component {
  render() {
    const path = pathGet(this, 'this.children.props.route.path', '');
		const pageParams = pathGet(this, 'props.params', {});
    const githubUrl = 'https://github.com/skratchdot/audio-automator';
    return (
      <div className={`page-${stringToCssName(path)}`}>
				<Grid>
					<Header pageParams={pageParams} />
					{this.props.children}
					<Footer />
					<GithubCorner href={githubUrl} />
				</Grid>
        <DevTools />
			</div>
    );
  }
}

export default App;
