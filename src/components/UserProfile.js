import React, { Component } from 'react';
import BuyCurrenciesModal from './BuyCurrenciesModal';
import SellCurrenciesModal from './SellCurrenciesModal';
import ConvertCurrenciesModal from './ConvertCurrenciesModal';
import $ from 'jquery';
import { Link } from 'react-router-dom';



class UserProfile extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
			userAccounts: [],
			showBuyCurrenciesModal: false,
			showSellCurrenciesModal: false,
			showConvertCurrenciesModal: false,
			currentBitcoinPrice: '',
			currentLitecoinPrice: '',
			currentEtheriumPrice: ''
		}
		this.showBuyCurrenciesModal = this.showBuyCurrenciesModal.bind(this);
		this.showSellCurrenciesModal = this.showSellCurrenciesModal.bind(this);
		this.showConvertCurrenciesModal = this.showConvertCurrenciesModal.bind(this);
		this.closeBuyCurrenciesModal = this.closeBuyCurrenciesModal.bind(this);
		this.closeSellCurrenciesModal = this.closeSellCurrenciesModal.bind(this);
		this.closeConvertCurrenciesModal = this.closeConvertCurrenciesModal.bind(this);
		this.setUserAccounts = this.setUserAccounts.bind(this);
		this.updateBitcoinValue = this.updateBitcoinValue.bind(this);
		this.updateLitecoinValue = this.updateLitecoinValue.bind(this);
		this.updateEtheriumValue = this.updateEtheriumValue.bind(this);
	}

	setUserAccounts(accounts) {
		this.setState({
			userAccounts: accounts
		})
	}

	showBuyCurrenciesModal() {
		this.setState({
			showBuyCurrenciesModal: true
		})
	}
	closeBuyCurrenciesModal() {
		this.setState({
			showBuyCurrenciesModal: false
		})
	}

	showSellCurrenciesModal() {
		this.setState({
			showSellCurrenciesModal: true
		})
	}
	closeSellCurrenciesModal() {
		this.setState({
			showSellCurrenciesModal: false
		})
	}

	showConvertCurrenciesModal() {
		this.setState({
			showConvertCurrenciesModal: true
		})
	}
	closeConvertCurrenciesModal() {
		this.setState({
			showConvertCurrenciesModal: false
		})
	}

	updateBitcoinValue(e) {
		$.ajax({
			method: "GET",
			url: "https://api.coindesk.com/v1/bpi/currentprice.json",
			dataType: "json",
			error:  (error) => {
				console.log(error)
			},
			success:  (data) => {
				console.log(data.bpi.USD.rate_float)
				this.setState({
				 	currentBitcoinPrice: data.bpi.USD.rate_float
				}) 
			}

		});
	}

	updateLitecoinValue(e) {
		$.ajax({
			method: "GET",
			url: "http://coincap.io/front",
			dataType: "json",
			error:  (error) => {
				console.log(error)
			},
			success:  (data) => {
				console.log(data[4].price)
				 this.setState({
					currentLitecoinPrice: data[4].price
				});
				console.log(this.state.currentLitecoinPrice); 
			}
		});
	}

	updateEtheriumValue(e) {
		$.ajax({
			method: "GET",
			url: "http://coincap.io/front",
			dataType: "json",
			error:  (error) => {
				console.log(error)
			},
			success:  (data) => {
				console.log(data[1].price);
				 this.setState({
					currentEtheriumPrice: data[1].price
				}) 
				 console.log(this.state.currentEtheriumPrice);
			}
		});
	}

	componentDidMount() {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.match.params.user_id}`, {
			method: "GET",
			}).then((res) => {
				return res.json()
			}).then((user) => {
				console.log(user)
				this.setState({user: user})
		});
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.match.params.user_id}/accounts`, {
			method: "GET",
			}).then((res) => {
				console.log(res);
				return res.json()
			}).then((accounts) => {
				console.log(accounts)
				this.setState({userAccounts: accounts})
		});
	}

	render() {
		return (
			<div className="container-fluid ">
				<div className="row ">
					<div className="col-sm-6 col-2">
						<div>
						<h1>{this.state.user.name} Profile</h1>
						Name:{this.state.user.name}, Cash Balance: ${this.state.user.cash_balance}
						</div>
						<br>
						</br>
						<div>
							Accounts: {this.state.userAccounts.map((account) => {
								return <li>Currency: {account.currency_name}, 
										Number of Units: {account.units_of_currency}, 
										Updated at: {account.updated_at}</li>
							})}
						</div>
						<br>
						</br>
						<div>
						Update Bitcoin Value: {this.state.userAccounts.length !== 0 && ((this.state.currentBitcoinPrice) * (this.state.userAccounts[0].units_of_currency))} 			
							<div className="updatebitcoin">
								 <button onClick= {this.updateBitcoinValue} ref="updatebitcoin" className="btn btn-lg btn-default btn-block updatebitcoin-button">Update Bitcoin Value</button>
								 Powered By: <Link to={"https://www.coindesk.com/price/"} target="_blank">CoinDesk</Link>
							</div>
								
						</div>
						<div>
						Update Litecoin Value: {this.state.userAccounts.length !== 0 && ((this.state.currentLitecoinPrice) * (this.state.userAccounts[2].units_of_currency))} 			
							<div className="updatelitecoin">
								 <button onClick= {this.updateLitecoinValue} ref="updatelitecoin" className="btn btn-lg btn-default btn-block updatelitecoin-button">Update Litecoin Value</button>
							</div>
						</div>
						<div>
						Update Etherium Value: {this.state.userAccounts.length !== 0 && ((this.state.currentEtheriumPrice) * (this.state.userAccounts[1].units_of_currency))} 			
							<div className="updateetherium">
								 <button onClick= {this.updateEtheriumValue} ref="updateetherium" className="btn btn-lg btn-default btn-block updateetherium-button">Update Etherium Value</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="buycurrencies">
							<button onClick={ this.showBuyCurrenciesModal } ref="buycurrencies" className="btn btn-lg btn-default btn-block buycurrencies-button">Buy Currencies</button>
						</div>
							{ this.state.showBuyCurrenciesModal ? <BuyCurrenciesModal userId={this.props.match.params.user_id} accountsAfterPurchase = { this.setUserAccounts } close={ this.closeBuyCurrenciesModal }/> : null }
						<div className="sellcurrencies">
							<button onClick={ this.showSellCurrenciesModal } ref="sellcurrencies" className="btn btn-lg btn-default btn-block sellcurrencies-button">Sell Currencies</button>
						</div>
							{ this.state.showSellCurrenciesModal ? <SellCurrenciesModal userId={this.props.match.params.user_id} accountsAfterSale={ this.setUserAccounts } close={ this.closeSellCurrenciesModal }/> : null }
						<div className="convertcurrencies">
							<button onClick={ this.showConvertCurrenciesModal } ref="convertcurrencies" className="btn btn-lg btn-default btn-block convertcurrencies-button">Convert Currencies</button>
						</div>
							{ this.state.showConvertCurrenciesModal ? <ConvertCurrenciesModal userId={this.props.match.params.user_id} accountsAfterConversion={ this.setUserAccounts } close={ this.closeConvertCurrenciesModal }/> : null }
					</div>
				</div>
			</div>
		)
	}
}


export default UserProfile
