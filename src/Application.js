import React, {Component} from 'react'
import Highscore from './Highscore'
import './css/app.css'

class Application extends Component {
    constructor(props){
        super(props);

        this.state = {
            count : 0,
            overFive : false
        }
    }

    handleClick = () => {
        this.setState({count : this.state.count + 1})
    }

    componentDidUpdate(props, state) {
        if(this.state.count > 5 && this.state.count !== state.count && !this.state.overFive){
            this.setState({overFive : true})
        }
    }

    resetHandler(e){
        this.setState({
            count : 0,
            overFive : false
        });
    }

    render(){
        let { count } = this.state

        return (
            <div>
                <h1>You clicked {count} times</h1>
                <Highscore 
                overFive = {this.state.overFive}
                onReset = {(e) => this.resetHandler(e)} />
                <button onClick={() => this.handleClick() }>click me</button>
            </div>
        )
    }
}

export default Application;