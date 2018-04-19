import React from 'react'
import { connect } from 'react-redux'
import { loadUser, loadUserRatings } from '../actions/userProfile'
import { getUserProfile } from '../reducers'

class UserProfile extends React.Component {

  componentWillMount() {
    const {id} = this.props.match.params
    this.props.loadUser(id)
    this.props.loadUserRatings(id)
  }

  render() {
    if (this.props.user === undefined) {
      return <div>Loading...</div>
    }
    const {id} = this.props.match.params
    return (
      <div>User profile for user {this.props.user.username}</div>
    )
  }
}

const mapStateToProps = state => ({
  user: getUserProfile(state)
})

const mapDispatchToProps = dispatch => ({
  loadUser: userId => dispatch(loadUser(userId)),
  loadUserRatings: userId => dispatch(loadUserRatings(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
