import React, { Component } from 'react';


class UpdateUserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		}
		this.onChangeName = this.onChangeName.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		})
	}

	updateUser(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userId}`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name
			})
			}).then((res) => {
				return res.json()
			}).then((updatedUser) => {
				this.props.update(updatedUser)
		});
	}

	render() {
		return(
			<div>
			<div className="update-user">
				<button className="update-user-button">Update Profile
               		<form onSubmit= {this.updateUser} >
			          <input onChange={this.onChangeName} type="name" value = {this.state.name} />
			          	<br>
			          	</br>
			          <button type="submit" className="btn btn-success" >Submit</button>
			          <button type="button" className="btn btn-lg btn-block" onClick={ this.props.close }>Close</button>
			        </form>
		       	</button>
	        </div>
	        </div>
		)
	}
}

export default UpdateUserForm