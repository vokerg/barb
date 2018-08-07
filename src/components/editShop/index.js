import React from 'react'
import { connect } from 'react-redux'

import ServiceSelect from './serviceSelect'
import { fetchShops, addShop, updateShop, loadServices, doRedirect } from '../../actions'
import { getShopById, isAdmin, isModerateShop, getServices, getUserId } from '../../reducers'
import GoogleMap from '../googleMaps'
import * as constants from '../../constants'
import EditShopForm from './editShopForm'

class EditShop extends React.Component {

	state = {
		name: '',
		address: '',
		description: '',
		services: [],
		coordinates: constants.DEFAULT_COORDINATES
	}

	constructor(props) {
		super()
		const { userId, admin, isModerateShop, doRedirect, loadServices, match } = props
		const { id } = match.params

		if (userId === null || (!admin && !isModerateShop)) {
			doRedirect('/login/')
		}
		if ((id === undefined) && (!admin)) {
			doRedirect('/')
		}
		if ((id !== undefined) && (!isModerateShop)) {
			doRedirect('/')
		}
		loadServices()
	}

	componentWillMount() {
    const { shop, match, fetchShops } = this.props
		const { id } = match.params
    if (!shop && id) {
      fetchShops(id)
		}
  }

	componentWillReceiveProps(futureProps) {
		const { shop } = futureProps
		this.setState({
			name: shop ? shop.name : '',
			address: shop ? shop.address : '',
			description: shop ? shop.description : '',
			services: shop ? shop.services : [],
			coordinates: (!shop || !shop.coordinates || shop.coordinates === {})
				? constants.DEFAULT_COORDINATES : shop.coordinates
		})
	}

	updateFieldEvent = key => event => this.setState({ [key]: event.target.value })
	onUpdateName = this.updateFieldEvent("name")
	onUpdateAddress = this.updateFieldEvent("address")
	onUpdateDescription = this.updateFieldEvent("description")

	handleSubmit = event => {
		event.preventDefault()
		const { name, address, description, services, coordinates } = this.state

		const { shop, addShop, updateShop, doRedirect } = this.props
		if (shop === undefined) {
			addShop(name, address, description, services, coordinates)
			doRedirect('/shop/new')
		}
		else {
			updateShop(shop.id, name, address, description, services, coordinates)
			doRedirect(`/shop/${shop.id}`)
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
				<div style={{height: "400px"}}>
					<GoogleMap
						marker={this.state.coordinates}
						onDragEnd={coordinates => this.setState({ coordinates })}
					/>
				</div>
			</EditShopForm>
	  )
	}
}

const mapStateToProps = (state, ownProps) => {
	let returnObject = {}
	const { id } = ownProps.match.params
	if (id) {
		const shop = getShopById(state, id)
		if (shop) {
			const { name, address, description, services, coordinates } = shop
			returnObject = { shop: { id, name, address, description, services, coordinates } }
		}
	}
	return {
		...returnObject,
		serviceList: getServices(state),
		userId: getUserId(state),
		admin: isAdmin(state),
		isModerateShop: isModerateShop(state, id)
	}
}

const mapDispatchToProps = dispatch => ({
	addShop: (name, address, description, services, coordinates) =>
		dispatch(addShop(name, address, description, services, coordinates)),
	updateShop: (id, name, address, description, services, coordinates) =>
		dispatch(updateShop(id, name, address, description, services, coordinates)),
	loadServices: () => dispatch(loadServices()),
	doRedirect: path => dispatch(doRedirect(path)),
	fetchShops: id => dispatch(fetchShops('All', '', id)),
	})


export default connect(mapStateToProps, mapDispatchToProps)(EditShop)
