import React from 'react'
import { connect } from 'react-redux'
import ServiceSelect from './serviceSelect'
import { addShop, updateShop } from '../../actions'
import { getShopById } from '../../reducers'


class EditShop extends React.Component {
	constructor(props) {
		super()
		const {shop} = props
		this.state = {
			name: (shop === undefined) ? '' : shop.name,
			address: (shop === undefined) ? '' : shop.address,
			description: (shop === undefined) ? '' : shop.description
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
		const {name, address, description} = this.state
		const {shop} = this.props
		if (shop === undefined) {
			this.props.addShop(name, address, description)
			this.props.history.push('/shop/new')
		}
		else {
			this.props.updateShop(shop.id, name, address, description)
			this.props.history.push('/shop/' + shop.id)
		}
	}

	render() {
	  return (
			<div>
				<form onSubmit={(this.handleSubmit).bind(this)}>
					<div>
						<label>
							Name:
							<input type="text" value={ this.state.name } onChange={ this.onUpdateName }/>
						</label>
						<label>
							Address:
							<input type="text" value= { this.state.address } onChange={ this.onUpdateAddress }/>
						</label>
						<label>
							Description:
							<textarea type="text" value= { this.state.description } onChange={ this.onUpdateDescription }/>
						</label>
					</div>
					<div>
						<input type="submit" value="Save" />
					</div>

					<ServiceSelect />


				</form>
			</div>
	  )
	}
}

const mapStateToProps = (state, ownProps) => {
	if (ownProps.match.params.id !== undefined) {
		const id = ownProps.match.params.id
		let shop = getShopById(state, id)
		const {name, address, description} = shop
		return {
			shop: {
				id,
				name,
				address,
				description
			}
		}
	}
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShop: (name, address, description) => {
			dispatch(addShop(name, address, description))
		},
		updateShop: (id, name, address, description) => {
			dispatch(updateShop(id, name, address, description))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShop)
