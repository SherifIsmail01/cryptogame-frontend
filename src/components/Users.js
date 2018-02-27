import React, { Component } from 'react';
import SignUpModal from './SignUpModal';


class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			showSignUpModal: false
		}
		this.addUser = this.addUser.bind(this);
		this.showSignUpModal = this.showSignUpModal.bind(this);
		this.closeSignUpModal = this.closeSignUpModal.bind(this);
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

	addUser(user) {
		this.setState({
			users: this.state.users.concat(user)
		})
	}


	componentDidMount() {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users.json`, {
			method: "GET",
			headers: {'Content-Type': 'application/json'}
			}).then((res) => {
				return res.json()
			}).then((users) => {
				this.setState({users: users})
		});
	}
	render() {
		return (
			<div>
		          <div className="row">
		            <div className="col-12 signup">	
		              	<button onClick={ this.showSignUpModal } ref="signup" className="btn btn-outline-secondary btn-md btn-default signup-button">Sign Up</button>
		            </div>
			      </div>
			          { this.state.showSignUpModal ? <SignUpModal myHistory={ this.props.history } signUp={ this.addUser } close={ this.closeSignUpModal }/> : null }
			         <br />
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
