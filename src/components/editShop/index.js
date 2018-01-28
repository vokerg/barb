import React from 'react'
import { connect } from 'react-redux'

import ServiceSelect from './serviceSelect'
import { addShop, updateShop, getServices, doRedirect } from '../../actions'
import { getShopById } from '../../reducers'
import GoogleMap from '../GoogleMaps'
import * as constants from '../../constants'
import EditShopForm from './editShopForm'

class EditShop extends React.Component {
	constructor(props) {
		super()

		if (props.userId === null) {
			props.doRedirect('/login/')
		}

		props.getServices()
		const {shop} = props
		this.state = {
			name: (shop === undefined) ? '' : shop.name,
			address: (shop === undefined) ? '' : shop.address,
			description: (shop === undefined) ? '' : shop.description,
			services: (shop === undefined) ? [] : shop.services,
			coordinates: ((shop === undefined)
					&& (shop.coordinates !== undefined)
					&& (shop.coordinates !== {}))
				? constants.DEFAULT_COORDINATES : shop.coordinates
		}

		const updateFieldEvent = key => event => {
			this.setState({
				...this.state,
				[key]: event.target.value
			})
		}
		this.onUpdateName = updateFieldEvent("name");
		this.onUpdateAddress = updateFieldEvent("address");
		this.onUpdateDescription = updateFieldEvent("description");
	}

	handleSubmit = (event => {

		event.preventDefault()
		const {
			name,
			address,
			description,
			services,
			coordinates
		} = this.state

		const {shop, addShop, updateShop, doRedirect} = this.props
		if (shop === undefined) {
			addShop(name, address, description, services, coordinates)
			doRedirect('/shop/new')
		}
		else {
			updateShop(shop.id, name, address, description, services, coordinates)
			doRedirect('/shop/' + shop.id)
		}
	})

	render() {
	  return (
			<EditShopForm
				onSubmit={this.handleSubmit}
				name={this.state.name}
				address={this.state.address}
				description={this.state.description}
				onUpdateName={this.onUpdateName}
				onUpdateAddress={this.onUpdateAddress}
				onUpdateDescription={this.onUpdateDescription}
			>
				<ServiceSelect
					serviceList={this.props.serviceList}
					valueList={this.state.services}
					servicesCallback={value =>
						this.setState({services: value.split(',')})
					}
				/>
				<hr></hr>
				<GoogleMap
					marker={this.state.coordinates}
					onDragEnd={coordinates => this.setState({coordinates})}
				/>
			</EditShopForm>
	  )
	}
}

const mapStateToProps = (state, ownProps) => {
	let returnObject = {}
	const {id} = ownProps.match.params
	if (id !== undefined) {
		let shop = getShopById(state, id)
		const {name, address, description, services, coordinates} = shop
		returnObject = {
			shop: {
				id,
				name,
				address,
				description,
				services,
				coordinates
			}
		}
	}
	return {...returnObject, serviceList: state.services, userId: state.common.userId}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShop: (name, address, description, services, coordinates) => {
			dispatch(addShop(name, address, description, services, coordinates))
		},
		updateShop: (id, name, address, description, services, coordinates) => {
			dispatch(updateShop(id, name, address, description, services, coordinates))
		},
		getServices: () => {
			dispatch(getServices())
		},
		doRedirect: path => {
			dispatch(doRedirect(path))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShop)
