import React from 'react'
import { connect } from 'react-redux'
import ServiceSelect from './serviceSelect'
import { addShop, updateShop, getServices } from '../../actions'
import { getShopById } from '../../reducers'
import Container from '../container'

class EditShop extends React.Component {
	constructor(props) {
		super()
		props.getServices()
		const {shop} = props
		this.state = {
			name: (shop === undefined) ? '' : shop.name,
			address: (shop === undefined) ? '' : shop.address,
			description: (shop === undefined) ? '' : shop.description,
			services: (shop === undefined) ? [] : shop.services
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
		const {name, address, description, services} = this.state
		const {shop} = this.props
		if (shop === undefined) {
			this.props.addShop(name, address, description, services)
			this.props.history.push('/shop/new')
		}
		else {
			this.props.updateShop(shop.id, name, address, description, services)
			this.props.history.push('/shop/' + shop.id)
		}
	}

	render() {
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
		const {name, address, description, services} = shop
		returnObject = {
			shop: {
				id,
				name,
				address,
				description,
				services
			}
		}
	}
	return {...returnObject, serviceList: state.services}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShop: (name, address, description, services) => {
			dispatch(addShop(name, address, description, services))
		},
		updateShop: (id, name, address, description, services) => {
			dispatch(updateShop(id, name, address, description, services))
		},
		getServices: () => {
			dispatch(getServices())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShop)
