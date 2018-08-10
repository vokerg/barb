import React from 'react'
import { connect } from 'react-redux'

import Filter from './shopFilter'
import Shops from './shops'
import ServicesFilter from './servicesFilter'
import { getServiceFilter } from '../../reducers'
import { updateServiceFilter } from '../../actions'

class MainPage extends React.Component {

  state = {
    selectedColumn: 0,
    filter: '',
  }

  handleServiceListChange = event =>
    this.props.updateServiceFilter(event.target.value)

  handleColumnChange = (event, selectedColumn) => {
    this.setState({ selectedColumn })
    this.props.updateServiceFilter([])
    switch(selectedColumn) {
      case 0: default: this.setState({ filter:'' })
      break
      case 1: this.setState({ filter:'favorites' })
      break
      case 2: this.setState({ filter:'' })
      break
    }
  }

  render() {
    const { selectedColumn, filter } = this.state;
    return (
      <div>
        <Filter selectedColumn={ selectedColumn } handleColumnChange={ this.handleColumnChange }/>
        {
          (selectedColumn === 2) &&
          <ServicesFilter selectedServices={ this.props.serviceFilter } handleServiceListChange={ this.handleServiceListChange }/>
        }
        <Shops filter={ filter } services= { this.props.serviceFilter }/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  serviceFilter: getServiceFilter(state)
})

const mapDispatchToProps = dispatch => ({
  updateServiceFilter: services => dispatch(updateServiceFilter(services))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
