import React from 'react'
import { connect } from 'react-redux'

import { updateServiceFilter, doRedirect } from '../actions'

class ShopsByService extends React.Component  {
  constructor(props) {
    super(props)
    props.updateServiceFilter([props.match.params.service])
    props.doRedirect('/')
  }

  render() {
    return <React.Fragment />
  }
}

const mapDispatchToProps = dispatch => ({
    updateServiceFilter: services => dispatch(updateServiceFilter(services)),
    doRedirect: redirectTo => dispatch(doRedirect(redirectTo))
})

export default connect(() =>({ }), mapDispatchToProps)(ShopsByService)
