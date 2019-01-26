import React from 'react'
import Genre from './Genre'

class TrailerContainer extends React.Component {

    render(){
        const { data } = this.props
        return (
            <div ref={this.props.forwardedRef} className="trailerContainer">
                <div className="trailerContainer-left">
                    <iframe className="youtube-player" type="text/html" title={data.EventTitle} src={`http://www.youtube.com/embed/${data.TrailerURL.split('?')[1].split('&')[0].split('=')[1]}`}></iframe>
                </div>
                <div className="trailerContainer-right">
                    <div>
                        <h2 className="trailerContainer-right-title">{data.EventTitle}</h2>
                        <p>{data.EventLanguage}</p>
                        <div className="genreArr">{data.EventGenre.split('|').map(g => <Genre key={g} genre={g} />)}</div>
                        <div style={{display: 'flex', fontSize: '0.8rem'}}>
                            <div>
                                <div style={{display: 'flex', alignItems: 'center', marginRight: '2rem'}}>
                                    <h3><span role="img" aria-label="thumbsup">👍</span></h3>
                                    <div style={{marginLeft: '0.5rem'}}>
                                        <span>{data.wtsPerc}%</span><br/>
                                        <span>{data.wtsCount} votes</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <h3><span role="img" aria-label="thumbsup">📅</span></h3>
                                    <div style={{marginLeft: '0.5rem'}}>
                                        <span>{'25 Jan'}</span><br/>
                                        <span>{'2019'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>Movie description.</p>
                    </div>
                    <div className="trailerContainer-right-footer">
                        <ActionCircles text="will watch" icon={`👍`} color="green" count={data.wtsCount} />
                        <ActionCircles text="maybe" icon={`?`} color="orange" count={data.maybeCount} />
                        <ActionCircles text="won't watch" icon={`👎`} color="red" count={data.dwtsCount} />
                    </div>
                </div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => {
    return <TrailerContainer {...props} forwardedRef={ref} />;
  });

const ActionCircles = props => {
    return <div className="actionCircles" style={{color: props.color}}>
        <div style={{width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: `1px solid ${props.color}`}}>{props.icon}</div>
        <p style={{textTransform: 'uppercase', fontSize: '0.6rem', margin: 0, marginTop: '0.3rem'}}>{props.text}</p>
        <p style={{textTransform: 'uppercase', fontSize: '0.6rem', margin: 0, marginTop: '0.3rem'}}>({props.count})</p>
    </div>
}