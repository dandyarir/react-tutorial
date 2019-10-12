import React, { Component } from 'react';
import Button from './Button'
import './css/calc.css'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: '0',
            previous: [],
            nextIsReset: false,
            decAfter : false
        }
    }

    resetCalc = () => {
        this.setState({ result : '0', previous: [], nextIsReset: false })
    }

    deleteInput = () => {
        let current = this.state.result
        if (current.length === 1)
            this.setState({ result: '0' })
        else {
            this.setState({ result: current.slice(0, -1) })
        }
    }

    addToCurrent = (symbol) => {
        if (['','x', '÷', '+', '-'].indexOf(symbol) > 0) {
            let { previous } = this.state

            if (symbol === 'x') symbol = '*'
            if (symbol === '÷') symbol = '/'
            
            previous.push(this.state.result + " " + symbol)
            this.setState({ previous, nextIsReset: true, decAfter: true })
        } else {
            if (this.state.result === '0' && symbol === '=') { }
            else if (symbol === '.' && this.state.result.includes('.')) { }

            else if ((this.state.result === '0' && symbol !== '.') || this.state.nextIsReset) {
                symbol === '.'
                    ? this.state.decAfter 
                        ? this.setState({ result: '0' + symbol, nextIsReset: false, decAfter: false })
                        : this.setState({ result: this.state.result + symbol, nextIsReset: false, decAfter: false })
                    : this.setState({ result: symbol, nextIsReset: false })
            }

            else {
                this.setState({ result: this.state.result + symbol })
            }
        }

    }

    calculateOps = () => {
        let { result, previous } = this.state;
        if (previous.length > 0) {
            result = String(eval(String(previous[previous.length - 1] + result)));
            this.setState({ result, previous: [], nextIsReset: false })
        }
    }

    render() {
        window.onerror = window.close; //native-like app feature

        const buttons = [
            { symbol: 'C', cols: 2, action: this.resetCalc },
            { symbol: 'del', cols: 1, action: this.deleteInput },
            { symbol: '÷', cols: 1, action: this.addToCurrent },
            { symbol: '9', cols: 1, action: this.addToCurrent },
            { symbol: '8', cols: 1, action: this.addToCurrent },
            { symbol: '7', cols: 1, action: this.addToCurrent },
            { symbol: 'x', cols: 1, action: this.addToCurrent },
            { symbol: '6', cols: 1, action: this.addToCurrent },
            { symbol: '5', cols: 1, action: this.addToCurrent },
            { symbol: '4', cols: 1, action: this.addToCurrent },
            { symbol: '-', cols: 1, action: this.addToCurrent },
            { symbol: '3', cols: 1, action: this.addToCurrent },
            { symbol: '2', cols: 1, action: this.addToCurrent },
            { symbol: '1', cols: 1, action: this.addToCurrent },
            { symbol: '+', cols: 1, action: this.addToCurrent },
            { symbol: '0', cols: 1, action: this.addToCurrent },
            { symbol: '.', cols: 1, action: this.addToCurrent },
            { symbol: '=', cols: 2, action: this.calculateOps },
        ];

        return (
            <div className='App'>
                {this.state.previous.length > 0
                    ? <div className='floaty-previous'>{this.state.previous[this.state.previous.length - 1]}</div>
                    : ""
                }
                <input className='result' type='text' value={this.state.result} /><br />

                {buttons.map((btnVal, i) => {
                    return <Button key={i} symbol={btnVal.symbol} cols={btnVal.cols} action={(symbol) => btnVal.action(symbol)} />
                })}

            </div>
        );
    }
}

export default App;