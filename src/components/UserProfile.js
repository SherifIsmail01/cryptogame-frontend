import React, { Component } from 'react';
import BuyCurrenciesModal from './BuyCurrenciesModal';
import SellCurrenciesModal from './SellCurrenciesModal';
import ConvertCurrenciesModal from './ConvertCurrenciesModal';
import UpdateUserForm from './UpdateUserForm';
import $ from 'jquery';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';


class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			cash_balance: 0,
			userAccounts: [],
			showBuyCurrenciesModal: false,
			showSellCurrenciesModal: false,
			showConvertCurrenciesModal: false,
			showUpdateUserForm: false,
			updatedUser: '',
			currentBitcoinPrice: '',
			currentLitecoinPrice: '',
			currentEthereumPrice: '',
			bitcoin: '',
			litecoin: '',
			ethereum: ''
		}
		this.showBuyCurrenciesModal = this.showBuyCurrenciesModal.bind(this);
		this.showSellCurrenciesModal = this.showSellCurrenciesModal.bind(this);
		this.showConvertCurrenciesModal = this.showConvertCurrenciesModal.bind(this);
		this.closeBuyCurrenciesModal = this.closeBuyCurrenciesModal.bind(this);
		this.closeSellCurrenciesModal = this.closeSellCurrenciesModal.bind(this);
		this.closeConvertCurrenciesModal = this.closeConvertCurrenciesModal.bind(this);
		this.showUpdateUserForm = this.showUpdateUserForm.bind(this);
		this.closeUpdateUserForm = this.closeUpdateUserForm.bind(this);
		this.setUserAccounts = this.setUserAccounts.bind(this);
		this.updateBitcoinValue = this.updateBitcoinValue.bind(this);
		this.updateLitecoinValue = this.updateLitecoinValue.bind(this);
		this.updateEthereumValue = this.updateEthereumValue.bind(this);
		this.updateCashBalance = this.updateCashBalance.bind(this);
		this.setUpdatedUser = this.setUpdatedUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.onChangePredictBitcoin = this.onChangePredictBitcoin.bind(this);
		this.onChangePredictLitecoin = this.onChangePredictLitecoin.bind(this);
		this.onChangePredictEthereum = this.onChangePredictEthereum.bind(this);
	}

	setUserAccounts(accounts) {
		this.setState({
			userAccounts: accounts
		})
	}

	updateCashBalance(cash_balance) {
		this.setState({
			cash_balance: cash_balance
		})
	}

	showUpdateUserForm() {
		this.setState({
			showUpdateUserForm: true
		})
	}

	closeUpdateUserForm() {
		this.setState({
			showUpdateUserForm: false
		});
		window.location.reload();
	}

	setUpdatedUser(updatedUser) {
		console.log(updatedUser)
		this.setState({
			user: updatedUser
		});
		window.location.reload();
	}

	deleteUser(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.match.params.user_id}`, 
			{
			method: "DELETE",
			}).then((res) => {
				this.props.history.push('/');
			});
		window.location.reload();
	}

	showBuyCurrenciesModal() {
		this.setState({
			showBuyCurrenciesModal: true
		})
	}
	closeBuyCurrenciesModal() {
		this.setState({
			showBuyCurrenciesModal: false
		});
		window.location.reload();
	}

	showSellCurrenciesModal() {
		this.setState({
			showSellCurrenciesModal: true
		})
	}
	closeSellCurrenciesModal() {
		this.setState({
			showSellCurrenciesModal: false
		});
		window.location.reload();
	}

	showConvertCurrenciesModal() {
		this.setState({
			showConvertCurrenciesModal: true
		})
	}
	closeConvertCurrenciesModal() {
		this.setState({
			showConvertCurrenciesModal: false
		});
		window.location.reload();
	}


	updateBitcoinValue(e) {
		if (e && e.preventDefault) e.preventDefault();
		
		// ✅ SECURE: Points to your Ruby proxy router path
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto_rates/spot/bitcoin`)
			.then(res => {
				if (!res.ok) throw new Error("Bitcoin fetch failed");
				return res.json();
			})
			.then(data => {
				// Rails returns the precise CoinGecko object: { bitcoin: { usd: X } }
				this.setState({ currentBitcoinPrice: data.bitcoin.usd });
				console.log("Bitcoin Price Updated securely via Rails proxy!");
			})
			.catch(error => {
				console.error("Bitcoin API Error:", error);
			});
	}

	updateLitecoinValue(e) {
		if (e && e.preventDefault) e.preventDefault();
		
		// ✅ SECURE: Points to your Ruby proxy router path
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto_rates/spot/litecoin`)
			.then(res => {
				if (!res.ok) throw new Error("Litecoin fetch failed");
				return res.json();
			})
			.then(data => {
				this.setState({ currentLitecoinPrice: data.litecoin.usd });
				console.log("Litecoin Price Updated securely via Rails proxy!");
			})
			.catch(error => {
				console.error("Litecoin API Error:", error);
			});
	}

	updateEthereumValue(e) {
		if (e && e.preventDefault) e.preventDefault();
		
		// ✅ SECURE: Points to your Ruby proxy router path
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto_rates/spot/ethereum`)
			.then(res => {
				if (!res.ok) throw new Error("Ethereum fetch failed");
				return res.json();
			})
			.then(data => {
				this.setState({ currentEthereumPrice: data.ethereum.usd });
				console.log("Ethereum Price Updated securely via Rails proxy!");
			})
			.catch(error => {
				console.error("Ethereum API Error:", error);
			});
	}



	onChangePredictBitcoin(e) {
		this.setState({
			bitcoin: e.target.value
		})
	}
	onChangePredictLitecoin(e) {
		this.setState({
			litecoin: e.target.value
		})
	}
	onChangePredictEthereum(e) {
		this.setState({
			ethereum: e.target.value
		})
	}

	componentDidMount() {

		const currentId = this.props.match.params.user_id || this.props.match.params.id;
		
		console.log("Loading UserProfile for Database Account ID:", currentId);

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentId}.json`, {
			method: "GET",
			}).then((res) => {
				if (!res.ok) throw new Error("Profile load failed");
				return res.json()
			}).then((user) => {
				this.setState({
					user: user,
					cash_balance: user.cash_balance,
					userAccounts: user.accounts || []
				});
		})
		.catch(err => {
			console.error("Error loading user profile onto screen:", err)
		});
	}

	// 1. Place this method helper script right above your render() block inside UserProfile.js:
// 1. Place this method helper script right above your render() block inside UserProfile.js:
	handleUserLogOut = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userName");
		this.props.history.push("/"); // Drops player safely back to the home chart landing deck
	};

	render() {
		return (
			<div className="container-fluid ">
				<div className="row ">
					<div className="col-sm-6 col-2">
						<div className="signout">
							<button onClick={this.handleUserLogOut} className="btn btn-dark w-100 mt-3">
								Sign Out
							</button>
						</div>
						<div className="profile">
							<h2>{this.state.user.name} Profile</h2>
							<li>Name:{this.state.user.name}</li>
							<li>Cash Balance: ${this.state.cash_balance}</li>
						</div>
						<div className="row">
				            <div className="col-12 updateuser">	
				              	<button onClick={ this.showUpdateUserForm } ref="updateuser" className="btn btn-outline-secondary btn-md btn-default updateuser-button">Update Profile</button>
				            </div>
				          	{ this.state.showUpdateUserForm ? <UpdateUserForm className="updateuserform" userId={this.props.match.params.user_id} update={ this.setUpdatedUser } close={ this.closeUpdateUserForm }/> : null }
				          	<div className="col-12 deleteuser">
				          		<button onClick={ this.deleteUser } ref="deleteuser" className="btn btn-outline-danger btn-md btn-default deleteuser-button">Delete Profile</button>
				          	</div>
			          	</div>
						<br />
						<div className="accounts">
							Accounts: {(this.state.userAccounts || []).map((account, index) => {
								return 	<div className="cards" key={index}>
										<Card body inverse color="info">
											<CardTitle>{account.currency_name}</CardTitle>
											<br/>
									        <CardText className="cards-text">Number of Units: {account.units_of_currency}</CardText>
								      	</Card>
								      	<br/>
								      	</div>
							})}
						</div>
						<br />
						<div className="row updatevalues-buttons">
							<div>
								<div className="updatebitcoin">
										Update Bitcoin Value: ${this.state.userAccounts.length !== 0 && this.state.currentBitcoinPrice && 
											((this.state.currentBitcoinPrice) * (this.state.userAccounts.filter((currencies) => {return currencies.currency_name === 'Bitcoin'})[0]?.units_of_currency || 0))}
									 <button onClick= {this.updateBitcoinValue} ref="updatebitcoin" className="btn btn-outline-secondary btn-block btn-md btn-default updatebitcoin-button">Update Bitcoin Value</button>
								</div>
									Powered By: <Link to={"https://www.coingecko.com/price/"} target="_blank">CoinGecko</Link>
							</div>
							<div>
										Update Litecoin Value: ${this.state.userAccounts.length !== 0 && this.state.currentLitecoinPrice && 
											((this.state.currentLitecoinPrice) * (this.state.userAccounts.filter((currencies) => {return currencies.currency_name === 'Litecoin'})[0]?.units_of_currency || 0))}								<div className="updatelitecoin">
									 <button onClick= {this.updateLitecoinValue} ref="updatelitecoin" className="btn btn-outline-secondary btn-block btn-md btn-default updatelitecoin-button">Update Litecoin Value</button>
								</div>
							</div>
							<div>
										Update Ethereum Value: ${this.state.userAccounts.length !== 0 && this.state.currentEthereumPrice && 
											((this.state.currentEthereumPrice) * (this.state.userAccounts.filter((currencies) => {return currencies.currency_name === 'Ethereum'})[0]?.units_of_currency || 0))}								<div className="updateethereum">
									 <button onClick= {this.updateEthereumValue} ref="updateethereum" className="btn btn-outline-secondary btn-block btn-md btn-default updateethereum-button">Update Ethereum Value</button>
								</div>
							</div>
						</div>

					</div>
					<div className="row currencies-buttons">
						<div className="buycurrencies">
							<button onClick={ this.showBuyCurrenciesModal } ref="buycurrencies" className="btn btn-lg btn-outline-secondary btn-default btn-block buycurrencies-button">Buy Currencies</button>
						</div>
							{ this.state.showBuyCurrenciesModal ? <BuyCurrenciesModal userIdBuying={this.props.match.params.user_id} accountsAfterPurchase = { this.setUserAccounts } cashBalanceAfterPurchase = {this.updateCashBalance} close={ this.closeBuyCurrenciesModal }/> : null }
						<div className="sellcurrencies">
							<button onClick={ this.showSellCurrenciesModal } ref="sellcurrencies" className="btn btn-lg btn-outline-secondary btn-default btn-block sellcurrencies-button">Sell Currencies</button>
						</div>
							{ this.state.showSellCurrenciesModal ? <SellCurrenciesModal userIdSelling={this.props.match.params.user_id} accountsAfterSale={ this.setUserAccounts } close={ this.closeSellCurrenciesModal }/> : null }
						<div className="convertcurrencies">
							<button onClick={ this.showConvertCurrenciesModal } ref="convertcurrencies" className="btn btn-lg btn-outline-secondary btn-default btn-block convertcurrencies-button">Convert Currencies</button>
						</div>
							{ this.state.showConvertCurrenciesModal ? <ConvertCurrenciesModal userIdConverting={this.props.match.params.user_id} accountsAfterConversion={ this.setUserAccounts } close={ this.closeConvertCurrenciesModal }/> : null }
					</div>
					<div className="predictPrices">
						Predict Bitcoin price:               		
						<form onSubmit= {this.onChangePredictBitcoin} >
	               			<div>
	             			<input onChange={this.onChangePredictBitcoin} type="radio" name="bitcoin" ref="Increase" value="Increase"  />Increase
	             			<br/>
	             			<input onChange={this.onChangePredictBitcoin} type="radio" name="bitcoin" ref="Decrease" value="Decrease"  />Decrease
	             			<br/>
	             			<input onChange={this.onChangePredictBitcoin} type="radio" name="bitcoin" ref="No change" value="No change"  />No change
	             			</div>
	             			<div>
	             				<h4>{this.state.bitcoin}</h4>
	             			</div>
	             			<br/>
				        </form>
 						Predict Litecoin price:               		
						<form onSubmit= {this.onChangePredictLitecoin} >
	               			<div>
	             			<input onChange={this.onChangePredictLitecoin} type="radio" name="litecoin" ref="Increase" value="Increase"  />Increase
	             			<br/>
	             			<input onChange={this.onChangePredictLitecoin} type="radio" name="litecoin" ref="Decrease" value="Decrease"  />Decrease
	             			<br/>
	             			<input onChange={this.onChangePredictLitecoin} type="radio" name="litecoin" ref="No change" value="No change"  />No change
	             			</div>
	             				<h4>{this.state.litecoin}</h4>
	             			<br/>
				        </form>
				        Predict Ethereum price:               		
						<form onSubmit= {this.onChangePredictEthereum} >
	               			<div>
	             			<input onChange={this.onChangePredictEthereum} type="radio" name="ethereum" ref="Increase" value="Increase"  />Increase
	             			<br/>
	             			<input onChange={this.onChangePredictEthereum} type="radio" name="ethereum" ref="Decrease" value="Decrease"  />Decrease
	             			<br/>
	             			<input onChange={this.onChangePredictEthereum} type="radio" name="ethereum" ref="No change" value="No change"  />No change
	             			</div>
	             				<h4>{this.state.ethereum}</h4>
	             			<br/>
				        </form>
					</div>
				</div>
			</div>
		)
	}
}


export default withRouter(UserProfile)
