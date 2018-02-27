import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';


class SignUpModal extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: ''
		}
		this.newUser = this.newUser.bind(this);
		this.onChangeNameInput = this.onChangeNameInput.bind(this);
		this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
		this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
	}

	onChangeNameInput(e) {
		this.setState({
			name: e.target.value
		})
	}

	onChangeEmailInput(e) {
		this.setState({
			email: e.target.value
		})
	}

	onChangePasswordInput(e) {
		this.setState({
			password: e.target.value
		})
	}

	newUser(e) {
		e.preventDefault();
		console.log(this.props);
		// console.log(this.props.match.params.user_id);
		console.log({ 
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			});
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users.json`, {
			method: "POST",
			credentials: "include",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ 
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
			}).then((res) => {
				return res.json()
			}).then((user) => {
				console.log(user.id);
				// console.log(this.props.match.params.user_id);
				this.props.signUp(user);
				this.props.history.push("/users/" + user.id)
				// return (<Link  to={"/users/" + user.id}></Link>)
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
	               		<form onSubmit= {this.newUser } >
				          <input onChange={this.onChangeNameInput} type="name" value = {this.state.name} placeholder="name" />
				          	<br>
				          	</br>
				          <input onChange={this.onChangeEmailInput} type="email" value = {this.state.email} placeholder="email" />
				          	<br>
				          	</br>
				          <input onChange={this.onChangePasswordInput} type="password" value = {this.state.password} placeholder="password" />  
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
