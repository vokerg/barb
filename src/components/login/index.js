import React from 'react'
import LoginView from './loginView'
import {login} from '../../api'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {
        username: "",
        password: ""
      },
      some: 1
    }
  }

  onChange = event => {
    this.setState(
      {user:{
          ...this.state.user,
          [event.target.name]:event.target.value
      }}
    )
  }

  onSubmit = event => {
    event.preventDefault();
    const {username, password} = this.state.user
    login(username, password).then(
      () => this.props.history.push('/'),
      () => console.log("incorrect username or password")
    )
  }

  render() {
    const {username, password} = this.state.user
    return (
      <LoginView
        username={username}
        password={password}
        onChange={this.onChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

export default Login
