import React from 'react'
import { IMAGE_BASE_URL } from './../constants'

export default class Poster extends React.Component {

    componentDidMount() {
        this.card && this.props.getCardWidth && this.props.getCardWidth(this.card.clientWidth)
        this.card && this.props.getCardWidth && window.addEventListener("resize", this.onResize)
    }

    onResize = () => {
        this.card && this.props.getCardWidth && this.props.getCardWidth(this.card.clientWidth)
    }

    componentWillMount(){
        this.props.getCardWidth && window.removeEventListener("resize", this.onResize)
    }

    render() {
        const { data } = this.props

        return(
            <div className="posterCard" ref={r => this.card = r}>
                <img alt="poster" src={IMAGE_BASE_URL.replace(`$$$`, data.EventCode)}/>
                <div className="posterCard-overlay">
                    <div className="posterCard-overlay-top">
                        <div style={styles.releaseDate}><span>25<br/> Jan</span></div>
                    </div>
                    <div className="onHoverPointer" onClick={() => this.props.onClick(data.EventCode, this.props.index)} style={{alignSelf: 'center'}}><img style={{width: 100}} src="/assets/images/play.png" alt="play"/></div>︎
                    <div className="posterCard-overlay-bottom">
                        <div><span role="img" aria-label="thumbsup">👍</span> {data.wtsPerc}%</div>
                        <div>{data.wtsCount} votes</div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    releaseDate: {
        borderRadius: '50%',
        background: 'aquamarine',
        fontSize: '0.7rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
    }
}