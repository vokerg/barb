import React from 'react'
import { connect } from 'react-redux'
import ServiceSelect from './serviceSelect'
import { addShop, updateShop, getServices } from '../../actions'
import { getShopById } from '../../reducers'
import Container from '../container'
//import GoogleMap from './map'
import GoogleMap from '../GoogleMaps'
import * as constants from '../../constants'

class EditShop extends React.Component {
	constructor(props) {
		super()
		props.getServices()
		const {shop} = props
		console.log("coordinates from shop object", shop.coordinates)
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

	handleSubmit(event) {
		event.preventDefault()
		let {
			name,
			address,
			description,
			services,
			coordinates
		} = this.state

		coordinates = {
			lat: Number(coordinates.lat),
			lng: Number(coordinates.lng)
		}
		const {shop} = this.props
		if (shop === undefined) {
			this.props.addShop(name, address, description, services, coordinates)
			this.props.history.push('/shop/new')
		}
		else {
			this.props.updateShop(shop.id, name, address, description, services, coordinates)
			this.props.history.push('/shop/' + shop.id)
		}
	}

	render() {
		console.log("coordinates", this.state.coordinates)
	  return (
			<Container>
				<form onSubmit={(this.handleSubmit).bind(this)}>
					<div>
						<div>
							<label>
								Name:
								<input type="text" value={ this.state.name } onChange={ this.onUpdateName }/>
							</label>
							<label>
								Address:
								<input type="text" value= { this.state.address } onChange={ this.onUpdateAddress }/>
							</label>
						</div>
						<div>
							<label>
								Description:
								<textarea type="text" value= { this.state.description } onChange={ this.onUpdateDescription }/>
							</label>
						</div>
					</div>
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
						onDragEnd={coordinates => {
							console.log(coordinates)
							this.setState({coordinates})
						}}
					/>
					<div>
						<hr></hr>
						<input type="submit" value="Save" />
						<input type="button" value="Cancel" />
					</div>
				</form>
			</Container>
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
	return {...returnObject, serviceList: state.services}
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShop)
