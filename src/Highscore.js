import React, { Component } from 'react'

class Highscore extends Component{
    
    render(){
        if(this.props.overFive){
            return (
                <h3>
                    its over 5 thousaaaaand <button onClick={this.props.onReset}>Reset</button>
                </h3>
            )
        } else {
            return null;
        }
    }
}
export default Highscore;