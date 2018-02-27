import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';



class SignInModal extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}
		this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
		this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
		this.logIn = this.logIn.bind(this);
	}

	onChangeEmailInput(e) {
		console.log(this.state.email)
		this.setState({
			email: e.target.value 
		})
	}

	onChangePasswordInput(e) {
		console.log(this.state.password)
		this.setState({
			password: e.target.value
		})
	}

	logIn(e) {
		e.preventDefault();
		console.log(this.state.email);
		fetch(`${process.env.REACT_APP_BACKEND_URL}/sessions.json`, {
			method: "POST",
			credentials: "include",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
			}).then((res) => {
				return res.json()
			}).then((user) => {
				this.props.signIn(user)
				this.props.appHistory.push("/users/")
		});
	}

	render() {
		return (
	        <div className="modal fade show" >
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="SignInModalLabel"></h5>
	              </div>
	              <div className="modal-body modal-dialog modal-lg">
	               		<form onSubmit={this.logIn} >
				          <input onChange={this.onChangeEmailInput} type="email" value={this.state.email} placeholder="email"/>
				          <input onChange={this.onChangePasswordInput} type="password" value={this.state.password} placeholder="password"/>  
				        	<br>
				        	</br>
				          <button type="submit" className="btn btn-success" >Login</button>
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
export default SignInModal
