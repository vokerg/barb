import React from 'react'
import { connect }  from 'react-redux'
import Filter from './shopFilter'
import Shops from './shops'
import { getShops } from '../../reducers'
import { fetchShops } from '../../actions'
import ServicesFilter from './servicesFilter'
import Container from '../container'

class MainPage extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedColumn: 0,
      filter: '',
      services: []
    }
  }

  handleColumnChange = (event, selectedColumn) => {
    this.setState({ selectedColumn })
    switch(selectedColumn) {
      case 0: this.setState({ filter:'', services: [] })
      break
      case 1: this.setState({ filter:'favorites', services: [] })
      break
      case 2: this.setState({ filter:'', services: [] })
      break
    }
  }

  render() {
    const {selectedColumn, filter, services} = this.state;
    return (
      <Container>
        <Filter selectedColumn={this.state.selectedColumn} handleColumnChange={this.handleColumnChange}/>
        {
          (this.state.selectedColumn === 2) &&
          <ServicesFilter />
        }
        <Shops filter={filter} services={services}/>
      </Container>
    )
  }
}

export default MainPage;
