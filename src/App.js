import React  from 'react';

import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'

import MainPage from './components/mainPage'
import ShopsByService from './components/shopsByService'
import EditShop from './components/editShop'
import Shop from './components/shop'
import Navigation from './components/navigation'
import Login from './components/login'
import Signup from './components/signup'
import { redirect, localLoad } from './actions'
import { setToken } from './api'
import BottomSnackbar from './components/bottomSnackbar'
import Booking from './components/booking'
import BookingAdmin from './components/bookingAdmin'
import UserAdmin from './components/userAdmin'
import UserProfile from './components/userProfile'
import BookingsUser from './components/bookingsUser'

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(redirect()),
  localLoad: (userId, token, username, admin, moderateShops) => dispatch(localLoad(userId, token, username, admin, moderateShops))
})

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo
})

class App extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem("token")
    setToken(token)
    props.localLoad(
      localStorage.getItem("userId"),
      token,
      localStorage.getItem("username"),
      localStorage.getItem("admin") || false,
      localStorage.getItem("moderateShops") || []
    )
  }

  componentWillReceiveProps({ redirectTo, redirect }) {
    if (redirectTo) {
      this.props.history.push(redirectTo)
      redirect();
    }
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
            <Navigation />
            <Route exact path="/" component= {MainPage} />
            <Route exact path="/createshop" component= {EditShop} />
            <Route exact path="/shop/:shopId" component= {Shop} />
            <Route exact path="/service/:service" component= {ShopsByService} />
            <Route exact path="/shop/edit/:id" component= {EditShop} />
            <Route exact path="/shop/:id/bookings" component= {BookingAdmin} />
            <Route exact path="/login" component= {Login} />
            <Route exact path="/signup" component= {Signup} />
            <Route exact path="/shop/book/:id" component= {Booking} />
            <Route exact path="/fbredirect" component= {Login} />
            <Route exact path="/useradmin" component= {UserAdmin} />
            <Route exact path="/users/:id" component= {UserProfile} />
            <Route exact path="/bookings" component= {BookingsUser} />
            <BottomSnackbar/>
          </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
