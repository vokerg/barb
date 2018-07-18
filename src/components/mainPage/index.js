import React from 'react'
import Filter from './shopFilter'
import Shops from './shops'
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

  handleServiceListChange = event =>
    this.setState({ services: event.target.value })

  handleColumnChange = (event, selectedColumn) => {
    this.setState({ selectedColumn })
    switch(selectedColumn) {
      case 0: default: this.setState({ filter:'', services: [] })
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
        <Filter selectedColumn={selectedColumn} handleColumnChange={this.handleColumnChange}/>
        {
          (selectedColumn === 2) &&
          <ServicesFilter selectedServices={services} handleServiceListChange={this.handleServiceListChange}/>
        }
        <Shops filter={filter} services={services}/>
      </Container>
    )
  }
}

export default MainPage;
