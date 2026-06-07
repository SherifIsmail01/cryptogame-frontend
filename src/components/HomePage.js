import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CryptoChart from './CryptoChart';
import GlobalGameVolume from './GlobalGameVolume';
import Users from './Users';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
import moment from 'moment';
import $ from 'jquery';
import { Link } from 'react-router-dom';



class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: '',
			disclaimer: '',
			showSignUpModal: false,
			showSignInModal: false,
			accountsTransactions: []
		}
		this.showSignUpModal = this.showSignUpModal.bind(this);
		this.closeSignUpModal = this.closeSignUpModal.bind(this);
		this.showSignInModal = this.showSignInModal.bind(this);
		this.closeSignInModal = this.closeSignInModal.bind(this);
		this.addUser = this.addUser.bind(this);
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


	render() {

		const cachedUserId = localStorage.getItem("userId");
		const cachedUserName = localStorage.getItem("userName");


		return (
			<div>
			{/* ✅ CLEANED: Removed the extra hardcoded duplicate buttons from this row */}
				<div className="row">
					<div className="col-12 signup">	
						{/* Left empty intentionally so buttons only render in our navigation deck below */}
					</div>
				</div>

				{/* ✅ KEEP YOUR DETAILED PROPS: This ensures your login/signup validation functions work perfectly */}
				{ this.state.showSignUpModal ? <SignUpModal myHistory={ this.props.history } signUp={ this.addUser } close={ this.closeSignUpModal }/> : null }
				{ this.state.showSignInModal ? (<SignInModal close={() => { this.setState({ showSignInModal: false }); this.props.history.push("/"); }} /> ) : null }
			<br />



			{/* --- PASTE THIS BLOCK JUST OVER YOUR SIGNUP / SIGNIN BUTTONS ELEMENT ROW --- */}
				<div className="homepage-navigation-deck text-center my-4">
					{localStorage.getItem("userId") && localStorage.getItem("userName") ? (
						// 1. DISPLAY THIS ONLY IF SIGNED IN
						<div className="signed-in-box">
							<Link to={`/profile/${localStorage.getItem("userId")}`} className="btn btn-primary btn-lg px-5 shadow-sm">
								Go to My Profile ({localStorage.getItem("userName")})
							</Link>
						</div>
					) : (
						// 2. DISPLAY THIS ONLY IF SIGNED OUT
						<div className="auth-buttons-container">
							<div className="d-flex justify-content-center gap-3">
								<button onClick={() => this.setState({ showSignUpModal: true })} className="btn btn-success btn-md px-4 mx-2 shadow-sm">
									Sign Up
								</button>
								<button onClick={() => this.setState({ showSignInModal: true })} className="btn btn-outline-success btn-md px-4 mx-2 shadow-sm">
									Sign In to Game Account
								</button>
							</div>
						</div>
					)}

					{/* ✅ THE FLOATING STATE GUARDS: These will now ONLY load floating above the page when clicked */}
					{this.state.showSignUpModal && (
						<SignUpModal close={() => this.setState({ showSignUpModal: false })} />
					)}
					
					{this.state.showSignInModal && (
						<SignInModal close={() => this.setState({ showSignInModal: false })} />
					)}
				</div>

					

		        <div className="date">Date: {moment().format('MMMM Do YYYY')}</div>

			    <div className="crypto-chart-container" style={{ padding: '20px' }}>
					<h1>Market Dashboard</h1>
					
					<CryptoChart />

					Powered By: <Link to={"https://www.coingecko.com"} target="_blank">coingecko</Link>
					<p className="disclaimer">
						{this.state.disclaimer}
					</p>

				</div>

				<div className="global-game-volume-container" style={{ padding: '20px' }}>
					<h1>Global Game Dashboard</h1>
					
					<GlobalGameVolume />


				</div>
			</div>
		);
	}
}

export default HomePage;
