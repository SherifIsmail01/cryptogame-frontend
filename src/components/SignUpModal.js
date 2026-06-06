import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import UserProfile from './UserProfile';


class SignUpModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			password: ''
		}
		this.newUser = this.newUser.bind(this);
		this.onChangeNameInput = this.onChangeNameInput.bind(this);
		this.onChangePasswordInput = this.onChangePasswordInput.bind(this);

	}

	onChangeNameInput(e) {
		this.setState({
			name: e.target.value
		})
	}

	onChangePasswordInput(e) {
		this.setState({
			password: e.target.value
		})
	}

	newUser(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users.json`, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ 
				name: this.state.name,
				password: this.state.password
			})
			}).then((res) => {
				return res.json()
			}).then((data) => {
				// Save details and push into UserProfile.js
				localStorage.setItem("userId", data.id);
				localStorage.setItem("userName", data.name);
				this.props.history.push(`/profile/${data.id}`);
		}).catch(err => {
			console.error("Signup frontend catch trigger:", err);
			alert("Signup failed, Please try a different name");
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
						  <input onChange={this.onChangePasswordInput} type="password" value={this.state.password} placeholder="Create Password"/>
				          	<br/>
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

export default withRouter(SignUpModal);
