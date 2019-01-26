import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<div className="Choose">
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1 style={{fontSize: '10vw', margin: 0}}><span role="img" aria-label="popcorn">🍿</span></h1>
                    <Link to="/trailers"><h2>Trailers</h2></Link>
                </div>
                <div className="verticalLine"></div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1 style={{fontSize: '10vw', margin: 0}}><span role="img" aria-label="keyboard">⌨️</span></h1>
                    <Link to="/input"><h2>Input</h2></Link>
                </div>
			</div>
		);
	}
}

export default App;
