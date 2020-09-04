import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = JSON.parse(localStorage.getItem('userInfo')) || {
      loginValue: '',
      passwordValue: '',
      isLoginValidated: true,
      isPasswordValidated: true,
      showPassword: false
    }
  }

  onLoginChange = ({ target: { value } }) => {
    if (!value.trim() || value.trim().length < 5) {
      this.setState({
        loginValue: value,
        isLoginValidated: false
      })
      return
    }
    this.setState({
      loginValue: value,
      isLoginValidated: true
    })
  }

  onPasswordChange = ({ target: { value } }) => {
    if (!value.trim() || value.trim().length < 5) {
      this.setState({
        passwordValue: value,
        isPasswordValidated: false
      })
      return
    }
    this.setState({
      passwordValue: value,
      isPasswordValidated: true
    })
  }

  handleClick = () => {
    const { loginValue, passwordValue, isLoginValidated, isPasswordValidated } = this.state
    if (loginValue && passwordValue && isLoginValidated && isPasswordValidated) {
      localStorage.setItem('userInfo', JSON.stringify(this.state))
      alert('You logged in')
      return
    }
    this.setState({
      isLoginValidated: false,
      isPasswordValidated: false
    })


  }

  render() {
    const { loginValue, passwordValue, isLoginValidated, isPasswordValidated } = this.state
    return (
      <div className="App">
        <h1>Log In</h1>

        <form >
          <div style={{ marginBottom: '20px' }}>
            <TextField
              error={!isLoginValidated}
              helperText={!isLoginValidated ? 'Login must contain minimum 5 letters' : null}
              id="standard-basic"
              label="Login"
              value={loginValue}
              onChange={this.onLoginChange} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <TextField
              error={!isPasswordValidated}
              helperText={!isPasswordValidated ? 'Password must contain min 5 letters' : null}
              id="standard-basic"
              label="Password"
              value={passwordValue}
              onChange={this.onPasswordChange}
            />
          </div>
          <div>
            <Button
              disabled={!isPasswordValidated || !isLoginValidated ? true : false}
              variant="contained"
              onClick={this.handleClick}>
              Sign In
              </Button>
          </div>

        </form>
      </div>
    );
  }

}


