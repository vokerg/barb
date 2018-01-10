import React from 'react'
import { connect }  from 'react-redux'
import Filter from './Filter'
import ShopList from '../ShopList'
import { getShops, isShopsRequested } from '../../reducers'
import { favoriteClick, fetchShops, requestShops } from '../../actions'

class MainPage extends React.Component {
  componentDidMount() {
    const {fetchShops, filter} = this.props
    fetchShops(filter)
  }
  render() {
    const {shops, onFavoriteClick} = this.props
    return (
      <div className="container">
        <div className="col-lg-9">
          <div className="card mt-4">
            <div className="card-body">
              <Filter />
              <ShopList shops={shops} onFavoriteClick={onFavoriteClick} isShopsRequested={this.props.isShopsRequested} />
            </div>
          </div>
        </div>
      </div>
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
      dispatch(requestShops())
      dispatch(fetchShops(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
