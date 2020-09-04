import React from 'react';
import './App.css';
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'




export default class App extends React.Component {
  storageData = JSON.parse(localStorage.getItem('state'))
  constructor() {
    super()

    this.state = this.storageData || {
      counter: 0,
      step: 1,
      minValue: 0,
      maxValue: 10
    }
  }

  onIncrement = () => {
    this.setState(({ counter, step }) => ({
      counter: counter + step
    }));
  }

  onDecrement = () => {
    this.setState(({ counter, step }) => ({
      counter: counter - step
    }));
  }

  onReset = () => {
    this.setState({
      counter: 0,
      step: 1,
      minValue: 0,
      maxValue: 10
    })
  }

  onMinChange = ({ target: { value } }) => {
    if (value < 0 || this.isValid(value)) {
      return
    }

    if (value > this.state.counter) {
      this.setState({
        counter: Number(value)
      })
    }
    this.setState({
      minValue: Number(value)
    })
  }

  onMaxChange = ({ target: { value } }) => {
    if (value < 0 || this.isValid(value)) {
      return
    }
    if (value < this.state.counter) {
      this.setState({
        counter: Number(value)
      })
    }
    this.setState({
      maxValue: Number(value)
    })
  }

  onStepChange = ({ target: { value } }) => {
    if (value < 0 || this.isValid(value)) {
      return
    }

    this.setState({
      step: Number(value)
    })

  }



  isValid(value) {
    return Number.isNaN(Number(value))
  }


  render() {
    localStorage.setItem('state', JSON.stringify(this.state))
    const { counter, step, maxValue, minValue } = this.state
    return (
      <div className="App" >
        <div style={{ paddingBottom: '10px' }}>
          <p style={{ fontSize: '30px' }}>Current Count: {counter} </p>
        </div>
        <div style={{ paddingBottom: '30px' }}>
          <Button variant='contained' color='secondary' disabled={counter < step ? true : false} onClick={this.onDecrement}>Decrease by {step}</Button>
          <Button variant='contained' color='primary' disabled={counter + step > maxValue ? true : false} onClick={this.onIncrement}>Increase by {step}</Button>
          <Button variant='contained' onClick={this.onReset}>Reset</Button>
        </div>
        <div>
          <TextField required id="standard-basic" label="Minimum" value={minValue} onChange={this.onMinChange} ></TextField>
          <TextField required id="standard-basic" label="Maximum" value={maxValue} onChange={this.onMaxChange}></TextField>
          <TextField required id="standard-basic" label="Step" value={step} onChange={this.onStepChange}></TextField>
        </div>
      </div>
    );
  }
}


