import React  from 'react';
//import './App.css';

import './vendor/bootstrap/css/bootstrap.min.css'
import './css/shop-item.css'

import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'

import MainPage from './components/mainPage'
import ShopsByService from './components/ShopsByService'
import EditShop from './components/editShop'
import Shop from './components/shop'
import Navigation from './components/Navigation'
import Login from './components/login'
import { redirect, localLoad } from './actions'
import { setToken } from './api'

const mapDispatchToProps = dispatch => {
  return {
    redirect: () => dispatch(redirect()),
    localLoad: (userId, token) => dispatch(localLoad(userId, token))
  }
}

const mapStateToProps = state => {
  return {
    redirectTo: state.common.redirectTo
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem("token")
    setToken(token)
    props.localLoad(localStorage.getItem("userId"), token)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo)
      nextProps.redirect();
    }
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <Navigation />
            <Route exact path="/" component= {MainPage} />
            <Route exact path="/createshop" component= {EditShop} />
            <Route exact path="/shop/:shopId" component= {Shop} />
            <Route exact path="/service/:service" component= {ShopsByService} />
            <Route path="/filter/:filter" component= {MainPage} />
            <Route exact path="/shop/edit/:id" component= {EditShop} />
            <Route exact path="/login" component= {Login} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
