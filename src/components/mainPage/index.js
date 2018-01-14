import React from 'react'
import { connect }  from 'react-redux'
import Filter from './Filter'
import ShopList from '../ShopList'
import { getShops, isShopsRequested } from '../../reducers'
import { favoriteClick, fetchShops } from '../../actions'
import Container from '../container'

class MainPage extends React.Component {
  componentDidMount() {
    const {fetchShops, filter} = this.props
    fetchShops(filter)
  }
  render() {
    const {shops, onFavoriteClick, isShopsRequested} = this.props
    return (
      <Container>
        <Filter />
        <ShopList shops={shops} onFavoriteClick={onFavoriteClick} isShopsRequested={isShopsRequested} />
      </Container>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter
  return {
    filter,
    shops: getShops(state),
    isShopsRequested: isShopsRequested(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFavoriteClick: (id) => {
      dispatch(favoriteClick(id))
    },
    fetchShops: (filter) => {
      dispatch(fetchShops(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
