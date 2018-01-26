import React from 'react'
import {connect} from 'react-redux'
import SignupForm from './signupForm'
import {signup} from '../../actions'


class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      repeatPassword: ""
    }
  }

  onChange = e => this.setState({
    ...this.state,
    [e.target.name]: e.target.value
  })

  onSubmit = (e) => {
    e.preventDefault()
    this.props.signup(this.state.username, this.state.password)
  }

  render() {
    const {username, password, repeatPassword} = this.state
    return(
      <SignupForm
        username = {username}
        password = {password}
        repeatPassword = {repeatPassword}
        onChange = {this.onChange.bind(this)}
        onSubmit = {this.onSubmit.bind(this)}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, password) => dispatch(signup(username, password))
  }
}

export default connect(()=>({}), mapDispatchToProps)(Signup)
