import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUsername} from '../reducers'
import {logout} from '../actions'

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand"  to="/">Barber shops</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
          {this.props.username ?
            <ul className="navbar-nav ml-auto">
              <li key="1" className="nav-item">
                <a className="nav-link" href="#">Hello {this.props.username}</a>
              </li>
              <li key="2" className="nav-item">
                <a className="nav-link" href="#" onClick={this.props.logout}>Logout</a>
              </li>
            </ul>
            :
            <ul className="navbar-nav ml-auto">
              <li key="3" className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li key="4" className="nav-item">
                <a className="nav-link" href="/signup">Signup</a>
              </li>
            </ul>
          }
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  username: getUsername(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
