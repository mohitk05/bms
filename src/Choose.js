import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<div className="Choose">
				<div><Link to="/trailers">Trailers</Link></div>
                <div><Link to="/input">Input</Link></div>
			</div>
		);
	}
}

export default App;
