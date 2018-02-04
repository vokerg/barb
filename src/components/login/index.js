import React from 'react'
import { connect } from 'react-redux'

import LoginView from './loginView'
import { login, loginFacebook } from '../../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    loginFacebook: () => dispatch(loginFacebook())
  }
}

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
    this.props.login(username, password)
  }

  render() {
    const {username, password} = this.state.user
    return (
      <LoginView
        username={username}
        password={password}
        onChange={this.onChange.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        onFacebookLogin={this.props.loginFacebook.bind(this)}
      />
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(Login)
