import React from 'react'
import { connect } from 'react-redux'

import ShopList from './shopList'
import { getShops } from '../reducers'
import { fetchShops } from '../actions'

class ShopsByService extends React.Component  {
  componentDidMount() {
    const {fetchShops, service} = this.props
    fetchShops(service)
  }

  render() {
    const { service, shops } = this.props
    return (
      <React.Fragment>
        <div>
          { service }
        </div>
        <ShopList shops={ shops }/>
      </React.Fragment>
    )
  }
}

const mapStateToProp = (state, {match}) => ({
    service: match.params.service,
    shops: getShops(state)
})

const mapDispatchToProps = dispatch => ({
    fetchShops: service => dispatch(fetchShops('All', service))
})

export default connect(mapStateToProp, mapDispatchToProps)(ShopsByService)
