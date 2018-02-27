import React, { Component } from 'react';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			showSignUpModal: false,
			showSignInModal: false,
			loggedIn: false 
		}
		this.addUser = this.addUser.bind(this);
		this.showSignUpModal = this.showSignUpModal.bind(this);
		this.closeSignUpModal = this.closeSignUpModal.bind(this);
		this.showSignInModal = this.showSignInModal.bind(this);
		this.closeSignInModal = this.closeSignInModal.bind(this);
		this.logInUser = this.logInUser.bind(this);
	}

	showSignUpModal() {
		this.setState({
			showSignUpModal: true
		})
	}
	closeSignUpModal() {
		this.setState({
			showSignUpModal: false
		})
	}

	showSignInModal() {
		this.setState({
			showSignInModal: true
		})
	}

	closeSignInModal() {
		this.setState({
			showSignInModal: false
		})
	}

	addUser(user) {
		this.setState({
			users: this.state.users.concat(user)
		})
	}

	logInUser(user) {
		this.setState({
			loggedIn: true
		})
	}

	componentDidMount() {
		console.log(this.props.history);
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users.json`, {
			method: "GET",
			headers: {'Content-Type': 'application/json'}
			}).then((res) => {
				return res.json()
			}).then((users) => {
				console.log(users)
				this.setState({users: users})
		});
	}
	render() {
		return (
			<div>
		          <div className="row">
		            <div className="col-12 signup">
		              	<button onClick={ this.showSignUpModal } ref="signup" className="btn btn-lg btn-default btn-block signup-button">Sign Up</button>
		            </div>
			      </div>
			          { this.state.showSignUpModal ? <SignUpModal myHistory={ this.props.history } signUp={ this.addUser } close={ this.closeSignUpModal }/> : null }
			         <br>
		          	</br>
		          <div className="row">
		            <div className="col-12 signin">
		              	<button onClick={ this.showSignInModal } ref="signin" className="btn btn-lg btn-default btn-block signin-button">Sign In</button>
		            </div>
		          </div>
		          	{ this.state.showSignInModal ? <SignInModal myHistory={ this.props.history } signIn={ this.logInUser } close={ this.closeSignInModal }/> : null }
				<div>
					{this.state.users.map((user) => {
						return <li>Name: {user.name}, Balance: ${user.cash_balance}</li>
					}) }
				</div>
			</div>
		)
	}
}
export default Users
