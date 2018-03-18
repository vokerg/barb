import React from 'react'
import { connect }  from 'react-redux'
import Filter from './Filter'
import ShopList from '../shopList'
import { getShops } from '../../reducers'
import { fetchShops } from '../../actions'
import Container from '../container'

class MainPage extends React.Component {
  componentDidMount() {
    const {fetchShops, filter} = this.props
    fetchShops(filter)
  }
  render() {
    return (
      <Container>
        <Filter />
        <ShopList shops={this.props.shops}/>
      </Container>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter
  return {
    filter,
    shops: getShops(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: (filter) => {
      dispatch(fetchShops(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
