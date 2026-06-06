import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // Added this to support pushing browser routes safely

class SignInModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameInput: '',
			passwordInput: ''
		}
		this.onChangeUsernameInput = this.onChangeUsernameInput.bind(this);
		this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
		this.logIn = this.logIn.bind(this);
	}

	onChangeUsernameInput(e) {
		this.setState({
			usernameInput: e.target.value 
		});
	}

	onChangePasswordInput(e) {
		this.setState({
			passwordInput: e.target.value
		});
	}

	logIn(e) {
		e.preventDefault();
		
		fetch(`${process.env.REACT_APP_BACKEND_URL}/login.json`, {
			method: "POST",
			credentials: "include",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				// ✅ FIXED: Using 'name' instead of 'username' to align exactly with User.find_by(name: params[:name]) in Rails
				name: this.state.usernameInput,
				password: this.state.passwordInput
			})
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(err => { throw new Error(err.error || "Login failed") });
			}
			return res.json();
		})
		.then(data => {
			if (data.authenticated) {
				localStorage.setItem("userId", data.user.id);
				localStorage.setItem("userName", data.user.name);

				// Close the modal cleanly before switching windows
				if (this.props.close) this.props.close();

				// Push the dashboard route open
				this.props.history.push(`/profile/${data.user.id}`);
			}
		})
		.catch(err => {
			alert(err.message);
		});
	}

	render() {
		return (
			/* ✅ MANDATORY OVERLAY BACKDROP: Creates the dark transparent blur and captures background click closes */
			<div className="modal-backdrop-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
					backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 2000, display: 'flex', justifycontent: center,
					alignItems: center
				}} onClick={this.props.close}>
				
				<div className="modal-dialog m-0" role="document" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '450px', zIndex: 2001 }}>
					<div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
						
						<div className="modal-header bg-success text-white p-3 d-flex justify-content-between align-items-center" style={{ borderBottom: 'none' }}>
							<h5 className="modal-title m-0 font-weight-bold" style={{ fontSize: '1.15rem' }}>Sign In to Game Account</h5>
							<button type="button" className="close text-white border-0 bg-transparent font-weight-light" style={{ fontSize: '1.75rem', outline: 'none', cursor: 'pointer' }} onClick={this.props.close}>&times;</button>
						</div>

						<div className="modal-body p-4 bg-white">
							<form onSubmit={this.logIn}>
								<div className="form-group mb-3">
									<label className="small font-weight-bold text-muted mb-1">Account Username</label>
									<input 
										onChange={this.onChangeUsernameInput} 
										type="text" 
										value={this.state.usernameInput} 
										placeholder="Enter name"
										className="form-control p-2"
										style={{ borderRadius: '6px', fontSize: '15px' }}
									/>
								</div>
								
								<div className="form-group mb-4">
									<label className="small font-weight-bold text-muted mb-1">Secure Password</label>
									<input 
										onChange={this.onChangePasswordInput} 
										type="password" 
										value={this.state.passwordInput} 
										placeholder="Enter password"
										className="form-control p-2"
										style={{ borderRadius: '6px', fontSize: '15px' }}
									/>
								</div>  
								
								<button type="submit" className="btn btn-success w-100 font-weight-bold py-2 mb-2" style={{ borderRadius: '8px', fontSize: '16px' }}>Login</button>
								<button type="button" className="btn btn-light text-secondary w-100 font-weight-bold py-2" style={{ borderRadius: '8px', fontSize: '15px', border: '1px solid #e2e8f0' }} onClick={this.props.close}>Cancel & Close</button>
							</form>
						</div>

					</div>
				</div>

			</div>
    	);
	}

}

// Wrapped with withRouter so this.props.history.push navigates routes correctly
export default withRouter(SignInModal);
