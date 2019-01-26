import React, { Component } from 'react';
import './App.css';
import PosterArray from './components/PosterArray'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posters: [],
            filteredPosters: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        fetch(proxyUrl + 'https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs')
            .then(res => res.json())
            .then(res => {
                this.setState({ posters: res, filteredPosters: res[1], loading: false })
            })
    }

	render() {
		return (
			<div className="Main">
                <h2 className="header">Trailers <span role="img" aria-label="popcorn">🍿</span></h2>
				{this.state.loading ? <h3 style={{color: 'white'}}>Loading...</h3> : <PosterArray posters={this.state.filteredPosters} />}
			</div>
		);
	}
}

export default Main;
