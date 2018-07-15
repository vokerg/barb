import React from 'react'
import { connect } from 'react-redux'

import { getServices } from '../../reducers'
import { loadServices } from '../../actions'

class Services extends React.Component {
  componentDidMount = () => this.props.loadServices()

  render() {
    const { serviceList } = this.props
    return (
      <div>
        {serviceList && serviceList.map(service => <snap>{service}</snap>)}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  serviceList: getServices(state)
})

const mapDispatchToProps = dispatch => ({
  loadServices: () => dispatch(loadServices())
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)
