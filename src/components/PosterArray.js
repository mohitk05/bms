import React from 'react'
import TrailerContainer from './TrailerContainer'

const Poster = React.lazy(() => import('./Poster'))

const trailerRef = React.createRef();

export default class PosterArray extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trailerOpen: false,
            selected: {},
            selectedData: undefined,
            outerWidth: 0,
            cardWidth: 0
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize)
        this.setState({
            outerWidth: this.arrayDiv.clientWidth
        })
    }

    onResize = () => {
        this.arrayDiv && this.setState({
            outerWidth: this.arrayDiv.clientWidth,
        }, () => {
            console.log('resize', this.state.outerWidth, this.state.cardWidth, Math.floor(this.state.outerWidth / this.state.cardWidth))
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize)
    }

    captureCardWidth = (width) => {
        console.log('capture width', width)
        if(width !== this.state.cardWidth) this.setState({cardWidth: width})
    }

    showTrailer = (id, index) => {
        console.log('outer inner', this.state.outerWidth, this.arrayDiv.clientWidth, this.state.cardWidth)
        let numCards = ((this.state.outerWidth || this.arrayDiv.clientWidth) && this.state.cardWidth) && Math.floor((this.state.outerWidth || this.arrayDiv.clientWidth) / this.state.cardWidth)
        console.log('numCards', numCards)
        if(numCards){
            index = Math.floor(index/numCards) * numCards
        }
        console.log('index', index)
        this.setState({
            trailerOpen: true,
            selected: {
                id, index
            },
            selectedData: this.props.posters[id]
        }, () => {
            trailerRef.current && window.scrollTo(0, trailerRef.current.offsetTop - 20)
        })
    }

    render() {
        const { posters } = this.props
        let top = this.state.selected.index ? Object.values(posters).slice(0, this.state.selected.index) : []
        let bottom = Object.values(posters).slice(this.state.selected.index, posters.length)
        return(
            <div>
                <React.Suspense fallback={<h3 style={{color: 'white'}}>Loading...</h3>}>
                    <div className="posterArray" ref={r => this.arrayDiv = r}>
                        {this.state.trailerOpen ? (<>{Object.values(top).map((p, i) => {
                                return <Poster 
                                            key={p.EventCode} 
                                            index={i} 
                                            data={p} 
                                            onClick={this.showTrailer}
                                        />
                            })}
                            <TrailerContainer ref={trailerRef} data={this.state.selectedData} />
                            {Object.values(bottom).map((p, i) => {
                                return <Poster 
                                            key={p.EventCode} 
                                            index={i + top.length}
                                            data={p}
                                            onClick={this.showTrailer} 
                                        />
                            })}</>) :  
                            Object.values(posters).map((p, i) => {
                                return <Poster 
                                            key={p.EventCode} 
                                            index={i}
                                            data={p} 
                                            getCardWidth={this.captureCardWidth} 
                                            onClick={this.showTrailer} 
                                        />
                            })
                        }
                    </div>
                </React.Suspense>
            </div>
        )
    }
}