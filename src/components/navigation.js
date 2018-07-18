import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsername, getActiveBookingCount } from '../reducers'
import { logout, doRedirect} from '../actions'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton'

class Navigation extends React.Component {
  render() {
    const buttonStyle = {
      color: 'white',
      textDecoration: 'none'
    };

    return (
      <AppBar title={<Link style={buttonStyle} to="/">Barber shops</Link>}
        iconElementRight=
          {(this.props.username) ?
            <div>
              <span style={buttonStyle}>Hello {this.props.username}</span>
              <IconMenu
                iconButtonElement={
                  <IconButton iconStyle={buttonStyle}><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText={`Bookings(${this.props.activeBookingCount})`} onClick={() => this.props.doRedirect('/bookings')}/>
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" onClick={this.props.logout}/>
              </IconMenu>
            </div>
          :
            <div>
              <FlatButton style={buttonStyle} label="Login" onClick={() => this.props.doRedirect('/login')}/>
              <FlatButton style={buttonStyle} label="Signup" onClick={() => this.props.doRedirect('/signup')}/>
            </div>
          }
      >
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  activeBookingCount: getActiveBookingCount(state),
  username: getUsername(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  doRedirect: (redirectTo) => dispatch(doRedirect(redirectTo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
