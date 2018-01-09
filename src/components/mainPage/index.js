import React from 'react'
import { connect }  from 'react-redux'
import Filter from './Filter'
import ShopList from '../ShopList'
import { getShopsByFilter } from '../../reducers'
import { favoriteClick, fetchShops } from '../../actions'


class MainPage extends React.Component {
  componentDidMount() {
    console.log("filter", this.props.filter)
    this.props.fetchShops(this.props.filter)
  }
  render() {
    const {shops, onFavoriteClick} = this.props
    return (
      <div className="container">
        <div className="col-lg-9">
          <div className="card mt-4">
            <div className="card-body">
              <Filter />
              <ShopList shops={shops} onFavoriteClick={onFavoriteClick} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//const MainPage = ({shops, onFavoriteClick}) => {

//}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter;
  const returnShops = getShopsByFilter(state, filter)
  return {
    filter,
    shops: returnShops,
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
