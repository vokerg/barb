import React from 'react'
import { connect } from 'react-redux'
import ShopList from './shopList'
import { getShops } from '../reducers'
import { requestShops, fetchShops } from '../actions'
import Container from './container'

class ShopsByService extends React.Component  {
  componentDidMount() {
    const {fetchShops, service} = this.props
    fetchShops(service)
  }
  render() {
    const {service, shops} = this.props
    return (
      <Container>
        <div>
          { service }
        </div>
        <ShopList shops={ shops } onFavoriteClick={ onFavoriteClick } />
      </Container>
    )
  }
}

const mapStateToProp = (state, {match}) => {
  const service = match.params.service
  return {
    service,
    shops: getShops(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: (service) => {
      dispatch(fetchShops('All', service))
    }
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(ShopsByService)
