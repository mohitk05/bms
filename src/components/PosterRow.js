import React from 'react'
import Poster from './Poster'

export default class PosterRow extends React.Component {
    render() {
        return (
            <div className="posterRow">
                {this.props.posters.map(p => <Poster key={p.EventCode} data={p} />)}
            </div>
        )
    }
}