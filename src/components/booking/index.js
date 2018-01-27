import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import Card from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {getShopById} from '../../reducers'

class Booking extends React.Component {

  render() {
    return (
      <Card className="container">
        <h2 className="card-heading">Book time</h2>
        <form>
          <DatePicker hintText="Select date" disableYearSelection={true} />
          <SelectField
            floatingLabelText="Frequency"
            //value={this.state.value}
            //onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </SelectField>
        </form>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const shop = getShopById(state, id)
  return {
    shop,
    id
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
