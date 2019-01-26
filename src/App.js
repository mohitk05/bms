import React, { Component } from 'react';
import './App.css';
import Choose from './Choose'
import Main from './Main'
import Input from './Input'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" render={props => <Choose {...props} />} />
					<Route path="/trailers" render={props => <Main {...props} />} />
					<Route path="/input" render={props => <Input {...props} />} />
				</Switch>
			</div>
		);
	}
}

export default App;
