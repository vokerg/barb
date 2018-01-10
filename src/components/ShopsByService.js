import React from 'react'
import { connect } from 'react-redux'
import ShopList from './ShopList'
import { getShopsByService } from '../reducers'
import { favoriteClick, requestShops, fetchShops } from '../actions'

class ShopsByService extends React.Component  {
  componentDidMount() {
    const {fetchShops, service} = this.props
    fetchShops(service)
  }
  render() {
    const {service, shops, onFavoriteClick} = this.props
    return (
      <div className="container">
        <div className="col-lg-9">
          <div className="card mt-4">
            <div className="card-body">
              <div>
                { service }
              </div>
              <ShopList shops={ shops } onFavoriteClick={ onFavoriteClick } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProp = (state, {match}) => {
  const service = match.params.service
  return {
    service,
    shops: getShopsByService(state, service)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: (service) => {
      dispatch(requestShops())
      dispatch(fetchShops('All', service))
    },
    onFavoriteClick: (id) => {
      dispatch(favoriteClick(id))
    }
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(ShopsByService)
