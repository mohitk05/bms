import React from 'react'
import _ from 'lodash'

const entries = [7000,7001,7002,7003,7004,7005]
export default class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
    }

    onChange = e => {
        this.setState({ error: false, input: e.target.value })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.submit()
        }
      }

    submit = () => {
        let input = this.state.input
        if(!/[^0-9,\s-]/.test(input)){
            let arr = input.replace(/\s+/g, '').split(',')
            let cleanArr = [...entries], duplicates = []
            arr.forEach(a => {
                if(a.includes('-')){
                    let push = true
                    let start = parseInt(a.split('-')[0])
                    let end = parseInt(a.split('-')[1])
                    cleanArr.slice().forEach((c, i) => {
                        if(typeof c === 'number' && c >= start && c <= end){
                            duplicates.push(cleanArr.splice(cleanArr.findIndex(ca => ca === c), 1)[0])
                        } else if(typeof c === 'string' && c.includes('-')){
                            let start_2 = parseInt(c.split('-')[0])
                            let end_2 = parseInt(c.split('-')[1])

                            let result = findOverlap([start, end], [start_2, end_2])
                            if(result.length){
                                result[0].forEach(r => cleanArr.push(r))
                                result[1].forEach(r => duplicates.push(r))
                            }
                            push = false
                        }
                    })
                    if(push){ 
                        cleanArr.push(a)
                        // for(let i = parseInt(a.split('-')[0]); i <= parseInt(a.split('-')[1]); i++){
                        //     cleanArr.push(i)
                        // }
                    }
                } else if(a.length){
                    a = parseInt(a)
                    if(!entries.find(e => a === e)){
                        cleanArr.push(a)
                    } else {
                        duplicates.push(a)
                    }
                }
            })

            console.log(cleanArr, duplicates)
            this.setState({cleanArr, duplicates})
        } else {
            this.setState({error: true})
        }
    }

    render() {
        return(
            <div className="inputContainer">
                <h2 style={{color: 'white'}}>The Magic Input <span role="img" aria-label="magic">💫</span></h2>
                <input onChange={this.onChange} onKeyPress={this._handleKeyPress} />
                {this.state.error && <div style={{color: 'indianred', marginTop: '0.5rem'}}>This doesn't look like what I expected! <span role="img" aria-label="magic">😥</span></div>}
                <button onClick={this.submit}>Submit</button>
                <div>
                {this.state.cleanArr ? <div><h4 style={{textAlign: 'center'}}>Unique</h4><div className="displayFlex" style={{justifyContent: 'center', flexWrap: 'wrap'}}>{this.state.cleanArr.map(a => <span style={{margin: 5}}>{a}</span>)}</div></div> : null}
                </div>
                <div>
                {this.state.duplicates ? <div><h4 style={{textAlign: 'center'}}>Duplicates</h4><div className="displayFlex" style={{justifyContent: 'center'}}>{this.state.duplicates.map(a => <span style={{margin: 5}}>{a}</span>)}</div></div> : null}
                </div>
            </div>
        )
    }
}

const findOverlap = (a, b) => {
    let left = a[0] <= b[0] ? a : b
    let right = left === a ? b : a

    if(left[1] < right[0]) return []

    if(right[0] <= left[1] && left[1] < right[1]) return [[left[1] + 1 === right[1] ? parseInt(right[1]) : `${left[1]+1}-${right[1]}`], []]
    else if(right[0] <= left[1] && left[1] >= right[1]) return []
}