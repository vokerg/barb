import React from 'react'
import { connect } from 'react-redux'
import { getShopById, getUserId } from '../../reducers'
import { addBooking, doRedirect, fetchShops } from '../../actions'
import BookingView from './bookingView'

class Booking extends React.Component {

  constructor() {
    super()
    this.state = {
      date: null,
      selectedService: "",
      comment: ""
    }
  }

  componentWillMount = () => {
    const {shop, fetchShops, match} = this.props
    if (shop === undefined) {
      fetchShops('All', '', match.params.id)
    }
  }

  onChange = event => this.setState({[event.target.name]: event.target.value})


  onDateChange = date => {this.setState({date})}

  submit = event => {
    event.preventDefault();
    const {shop, userId} = this.props
    const {date, selectedService, comment} = this.state
    this.props.addBooking(shop.id, userId, date, selectedService, comment)
    doRedirect(`/shop/${shop.id}`)
  }

  render() {
    const {shop} = this.props
    return (shop === undefined) ? <div>Loading...</div> :
      <BookingView
        selectedService={this.state.selectedService}
        services={shop.services}
        onSubmit={this.submit.bind(this)}
        onChange={this.onChange}
        date={this.state.date}
        onDateChange={this.onDateChange}
      />
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const shop = getShopById(state, id)
  const userId = getUserId(state)
  return { shop, id, userId }
}

const mapDispatchToProps = dispatch => ({
  addBooking: (shopId, userId, date, service, commment) =>
    dispatch(addBooking(shopId, userId, date, service, commment)),
  doRedirect: path => dispatch(doRedirect(path)),
  fetchShops: (filter, services, id) => dispatch(fetchShops(filter, services, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
