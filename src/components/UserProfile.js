import React, { Component } from 'react';
import BuyCurrenciesModal from './BuyCurrenciesModal';
import SellCurrenciesModal from './SellCurrenciesModal';
import ConvertCurrenciesModal from './ConvertCurrenciesModal';




class UserProfile extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
			userAccounts: [],
			showBuyCurrenciesModal: false,
			showSellCurrenciesModal: false,
			showConvertCurrenciesModal: false
		}
		this.showBuyCurrenciesModal = this.showBuyCurrenciesModal.bind(this);
		this.showSellCurrenciesModal = this.showSellCurrenciesModal.bind(this);
		this.showConvertCurrenciesModal = this.showConvertCurrenciesModal.bind(this);
		this.closeBuyCurrenciesModal = this.closeBuyCurrenciesModal.bind(this);
		this.closeSellCurrenciesModal = this.closeSellCurrenciesModal.bind(this);
		this.closeConvertCurrenciesModal = this.closeConvertCurrenciesModal.bind(this);
		this.setUserAccounts = this.setUserAccounts.bind(this);
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
			<div className="container-fluid h-100">
				<div className="row h-100">
					<div className="col-sm-6 col-2 bg-dark text-white py-2 d-flex align-items-center justify-content-center" id="left">
						<div>
						<h1>{this.state.user.name} Profile</h1>
						Name:{this.state.user.name}, Cash Balance: ${this.state.user.cash_balance} 
						</div>
						<br>
						</br>
						<div>
							Accounts: {this.state.userAccounts.map((account) => {
								return <li>Currency: {account.currency_name}, Number of Units: {account.units_of_currency}, Updated at: {account.updated_at}</li>
							})}
						</div>
						<br>
						</br>
					</div>
					<div className="col-sm-6 invisible col-2"></div>
					<div className="col offset-2 offset-sm-6 py-2">
						<div>
							<button onClick={ this.showBuyCurrenciesModal } ref="buycurrencies" className="btn btn-lg btn-default btn-block buycurrencies-button">Buy Currencies</button>
						</div>

						{ this.state.showBuyCurrenciesModal ? <BuyCurrenciesModal userId={this.props.match.params.user_id} accountsAfterPurchase = { this.setUserAccounts } close={ this.closeBuyCurrenciesModal }/> : null }
						<br>
						</br>
						<div>
							<button onClick={ this.showSellCurrenciesModal } ref="sellcurrencies" className="btn btn-lg btn-default btn-block sellcurrencies-button">Sell Currencies</button>
						</div>
						{ this.state.showSellCurrenciesModal ? <SellCurrenciesModal userId={this.props.match.params.user_id} accountsAfterSale={ this.setUserAccounts } close={ this.closeSellCurrenciesModal }/> : null }
						<br>
						</br>
						<div>
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
