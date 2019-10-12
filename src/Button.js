import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <div className={`column-${this.props.cols}`}>
                <button className='btn-calc' onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button><br/>
            </div>
        )
    }
}

export default Button;