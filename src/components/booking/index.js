import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import Card from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {getShopById, getUserId} from '../../reducers'
import {addBooking} from '../../actions'

class Booking extends React.Component {

  constructor() {
    super()
    this.state = {
      date: "",
      selectedService: "",
      comment: ""
    }
  }

  dateChange = (event, value) => {
    this.setState({
      ...this.state,
      date: value
    })
  }

  serviceChange = (event, index, value) => {
    this.setState({
      ...this.state,
      selectedService: value
    })
  }

  commentChange = (event, value) => {
    this.setState({
      ...this.state,
      comment: value
    })
  }

  submit(e) {
    e.preventDefault();
    const {shop, userId} = this.props
    const {date, selectedService, comment} = this.state
    this.props.addBooking(shop.id, userId, date, selectedService, comment)
  }

  render() {
    const {shop} = this.props
    return (
      <Card className="container">
        <h2 className="card-heading">Book time</h2>
        <form onSubmit = {this.submit.bind(this)}>
          <div className="field-line">
            <DatePicker hintText="Select date" disableYearSelection={true} onChange={this.dateChange.bind(this)} />
          </div>
          <div className="field-line">
            <SelectField
              floatingLabelText="Service"
              value={this.state.selectedService}
              onChange={this.serviceChange.bind(this)}
            >
              {shop.services.map((service, i) =>
                <MenuItem key={i} value={service} primaryText={service} />
              )}
            </SelectField>
          </div>
          <div className="field-line">
            <TextField
              onChange = {this.commentChange}
              hintText="Comments"
              multiLine={true}
              rows={2}
              rowsMax={4}
            />
          </div>
          <div className="field-line">
            <FlatButton label="Submit" type="Submit" />
          </div>
        </form>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const shop = getShopById(state, id)
  const userId = getUserId(state)
  return {
    shop,
    id,
    userId
  }
}

const mapDispatchToProps = dispatch => ({
  addBooking: (shopId, userId, date, service, commment) =>
    dispatch(addBooking(shopId, userId, date, service, commment))
})

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
