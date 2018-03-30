import React from 'react'
import { connect } from 'react-redux'

class UserProfile extends React.Component {
  componentWillMount() {

  }
  render() {
    return (
      <div>User profile</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
