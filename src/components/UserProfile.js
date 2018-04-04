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
			currentBitcoinPrice: '',
			currentLitecoinPrice: '',
			currentEtheriumPrice: '',
			bitcoin: null,
			litecoin: null,
			etherium: null
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
		this.updateEtheriumValue = this.updateEtheriumValue.bind(this);
		this.updateCashBalance = this.updateCashBalance.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.predictEtherium = this.predictEtherium.bind(this);
		this.predictLitecoin = this.predictLitecoin.bind(this);
		this.predictBitcoin = this.predictBitcoin.bind(this);
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
		})
	}

	setUpdatedUser(updatedUser) {
		console.log(updatedUser)
		this.setState({
			user: updatedUser
		})
	}

	deleteUser(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.match.params.user_id}`, 
			{
			method: "DELETE",
			}).then((res) => {
				this.props.history.push('/');
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
				 this.setState({
					currentLitecoinPrice: data[4].price
				});
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
				 this.setState({
					currentEtheriumPrice: data[1].price
				})
			}
		});
	}

	predictBitcoin(e) {
		this.setState({
			bitcoin: e.target.value
		})
	}
	predictLitecoin(e) {
		this.setState({
			litecoin: e.target.value
		})
	}
	predictEtherium(e) {
		this.setState({
			etherium: e.target.value
		})
	}

	componentDidMount() {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.match.params.user_id}`, {
			method: "GET",
			}).then((res) => {
				return res.json()
			}).then((user) => {
				this.setState({
					user: user,
					cash_balance: user.cash_balance,
					userAccounts: user.accounts
				})
		});
	}

	componentWillUpdate() {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.match.params.user_id}`, {
			method: "GET",
			}).then((res) => {
				return res.json()
			}).then((user) => {
				this.setState({
					user: user,
					cash_balance: user.cash_balance,
					userAccounts: user.accounts
				})
		});
	}

	render() {
		return (
			<div className="container-fluid ">
				<div className="row ">
					<div className="col-sm-6 col-2">
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
							Accounts: {this.state.userAccounts.map((account) => {
								return 	<div className="cards">
										<Card body inverse color="info">
											<CardTitle>{account.currency_name}</CardTitle>
											<br/>
									        <CardText>Number of Units: {account.units_of_currency}</CardText>
								      	</Card>
								      	<br/>
								      	</div>
							})}
						</div>
						<br />
						<div className="updatevalues">
							<div>
							Update Bitcoin Value: ${this.state.userAccounts.length !== 0 && ((this.state.currentBitcoinPrice) * (this.state.userAccounts.filter((currencies) => {return currencies.currency_name === 'Bitcoin'})[0].units_of_currency))} 			
								<div className="updatebitcoin">
									 <button onClick= {this.updateBitcoinValue} ref="updatebitcoin" className="btn btn-outline-info btn-lg btn-default updatebitcoin-button">Update Bitcoin Value</button>
								</div>
									Powered By: <Link to={"https://www.coindesk.com/price/"} target="_blank">CoinDesk</Link>
							</div>
							<div>
							Update Litecoin Value: ${this.state.userAccounts.length !== 0 && ((this.state.currentLitecoinPrice) * (this.state.userAccounts.filter((currencies) => {return currencies.currency_name === 'Litecoin'})[0].units_of_currency))} 			
								<div className="updatelitecoin">
									 <button onClick= {this.updateLitecoinValue} ref="updatelitecoin" className="btn btn-outline-info btn-lg btn-default updatelitecoin-button">Update Litecoin Value</button>
								</div>
							</div>
							<div>
							Update Etherium Value: ${this.state.userAccounts.length !== 0 && ((this.state.currentEtheriumPrice) * (this.state.userAccounts.filter((currencies) => {return currencies.currency_name === 'Etherium'})[0].units_of_currency))} 			
								<div className="updateetherium">
									 <button onClick= {this.updateEtheriumValue} ref="updateetherium" className="btn btn-outline-info btn-lg btn-default updateetherium-button">Update Etherium Value</button>
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
						Predict Bitcoin price:  {this.state.bitcoin}             		
						<form onSubmit= {this.predictBitcoin} >
	               			<div>
	             			<input onChange={this.state.bitcoin} type="radio" name="bitcoin" ref="Increase" value="Increase"  />Increase
	             			<br/>
	             			<input onChange={this.state.bitcoin} type="radio" name="bitcoin" ref="Decrease" value="Decrease"  />Decrease
	             			<br/>
	             			<input onChange={this.state.bitcoin} type="radio" name="bitcoin" ref="No change" value="No change"  />No change
	             			</div>
	             			<br/>
				        </form>
 						Predict Litecoin price: {this.state.litecoin}              		
						<form onSubmit= {this.predictLitecoin} >
	               			<div>
	             			<input onChange={this.state.litecoin} type="radio" name="litecoin" ref="Increase" value="Increase"  />Increase
	             			<br/>
	             			<input onChange={this.state.litecoin} type="radio" name="litecoin" ref="Decrease" value="Decrease"  />Decrease
	             			<br/>
	             			<input onChange={this.state.litecoin} type="radio" name="litecoin" ref="No change" value="No change"  />No change
	             			</div>
	             			<br/>
				        </form>
				        Predict Etherium price:  {this.state.etherium}             		
						<form onSubmit= {this.predictEtherium} >
	               			<div>
	             			<input onChange={this.state.etherium} type="radio" name="etherium" ref="Increase" value="Increase"  />Increase
	             			<br/>
	             			<input onChange={this.state.etherium} type="radio" name="etherium" ref="Decrease" value="Decrease"  />Decrease
	             			<br/>
	             			<input onChange={this.state.etherium} type="radio" name="etherium" ref="No change" value="No change"  />No change
	             			</div>
	             			<br/>
				        </form>
					</div>
				</div>
			</div>
		)
	}
}


export default withRouter(UserProfile)
