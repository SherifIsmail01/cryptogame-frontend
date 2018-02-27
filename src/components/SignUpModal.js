import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';


class SignUpModal extends Component {
	constructor() {
		super();
		this.state = {
			name: ''
		}
		this.newUser = this.newUser.bind(this);
		this.onChangeNameInput = this.onChangeNameInput.bind(this);
	}

	onChangeNameInput(e) {
		this.setState({
			name: e.target.value
		})
	}

	newUser(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users.json`, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ 
				name: this.state.name
			})
			}).then((res) => {
				return res.json()
			}).then((user) => {
				this.props.signUp(user);
				this.props.myHistory.push("/users/" + user.id)
		});
	}

	render() {
		return (
	        <div className="modal fade show" style={{display: 'block'}}>
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="SignUpModalLabel">Sign Up</h5>
	              </div>
	              <div className="modal-body">
	               		<form onSubmit= {this.newUser} >
				          <input onChange={this.onChangeNameInput} type="name" value = {this.state.name} placeholder="name" />
				          	<br>
				          	</br>
				          <button type="submit" className="btn btn-success" >Submit</button>
				          <button type="button" className="btn btn-lg btn-block" onClick={ this.props.close }>Close</button>
				        </form>
	              </div>
	              <div className="modal-footer">
	              </div>
	            </div>
	          </div>
	        </div>
    	);
	}
}
export default SignUpModal
