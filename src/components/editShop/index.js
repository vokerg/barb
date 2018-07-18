import React from 'react'
import { connect } from 'react-redux'

import ServiceSelect from './serviceSelect'
import { addShop, updateShop, loadServices, doRedirect } from '../../actions'
import { getShopById, isAdmin, isModerateShop, getServices, getUserId } from '../../reducers'
import GoogleMap from '../googleMaps'
import * as constants from '../../constants'
import EditShopForm from './editShopForm'

class EditShop extends React.Component {
	constructor(props) {
		super()
		const {userId, admin, isModerateShop, doRedirect, loadServices, shop} = props
		if (userId === null || (!admin && !isModerateShop)) {
			doRedirect('/login/')
		}
		if ((shop === undefined) && (!admin)) {
			doRedirect('/')
		}
		if ((shop !== undefined) && (!isModerateShop)) {
			doRedirect('/')
		}
		loadServices()

		this.state = {
			name: (shop === undefined) ? '' : shop.name,
			address: (shop === undefined) ? '' : shop.address,
			description: (shop === undefined) ? '' : shop.description,
			services: (shop === undefined) ? [] : shop.services,
			coordinates: ((shop === undefined)
					|| (shop.coordinates === undefined)
					|| (shop.coordinates === {}))
				? constants.DEFAULT_COORDINATES : shop.coordinates
		}

		const updateFieldEvent = key => event =>
			this.setState({ [key]: event.target.value })

		this.onUpdateName = updateFieldEvent("name");
		this.onUpdateAddress = updateFieldEvent("address");
		this.onUpdateDescription = updateFieldEvent("description");
	}

	handleSubmit = event => {
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
	}

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
		const {name, address, description, services, coordinates} = getShopById(state, id)
		returnObject = {
			shop: {
				id,
				name,
				address,
				description,
				services,
				coordinates
			},
			isModerateShop: isModerateShop(state, id)
		}
	}
	return {
		...returnObject,
		serviceList: getServices(state),
		userId: getUserId(state),
		admin: isAdmin(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShop: (name, address, description, services, coordinates) =>
			dispatch(addShop(name, address, description, services, coordinates)),
		updateShop: (id, name, address, description, services, coordinates) =>
			dispatch(updateShop(id, name, address, description, services, coordinates)),
		loadServices: () => dispatch(loadServices()),
		doRedirect: path => dispatch(doRedirect(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShop)
