import React from 'react'
import { connect }  from 'react-redux'

import ShopList from '../shopList'
import { getShops } from '../../reducers'
import { fetchShops } from '../../actions'

class Shops extends React.Component {
  componentDidMount() {
    const { fetchShops, filter, services } = this.props
    fetchShops(filter, services)
  }

  componentWillReceiveProps({filter, services, fetchShops}) {
    if (this.props.filter !== filter || this.props.services !== services) {
      fetchShops(filter, services)
    }
  }

  render() {
    return <ShopList shops={this.props.shops}/>
  }
}

const mapStateToProps = (state, { filter }) => ({
  shops: getShops(state, filter)
})

const mapDispatchToProps = dispatch => ({
  fetchShops: (filter, services) => dispatch(fetchShops(filter, services))
})

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
