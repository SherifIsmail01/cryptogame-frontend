import React, { Component } from 'react';


class BuyCurrenciesModal extends Component {
	constructor() {
		super();
		this.buyCurrencies = this.buyCurrencies.bind(this);
		this.state = {
			accounts: [],
			cash_balance: null,
			buy: null
		}
		this.onChangeBuyCurrency = this.onChangeBuyCurrency.bind(this);
	}


	onChangeBuyCurrency(e) {
		this.setState({
			buy: e.target.value
		})
	}
	
	buyCurrencies(e) {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userId}/accounts/buy`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				Bitcoin: 10703.9675,
				Litecoin: 220.755,
				Etherium: 886.96,
				currency_to_buy: this.state.buy,
				num_of_units: this.refs.numberOfUnits.value
			})
			}).then((res) => {
				return res.json()
			}).then((newAccounts) => {
				// console.log(total_price_of_purchase)
				console.log(newAccounts);

				this.setState({
					cash_balance: newAccounts.cash_balance
				})
				this.props.accountsAfterPurchase(newAccounts)
				console.log(this.state.cash_balance)
		})
	}

	render() {
		return (
			<div className="modal fade show">
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="BuyCurrenciesModalLabel">Buy Currencies</h5>
	              </div>
	              <div className="modal-body">
	               		<form onSubmit= {this.buyCurrencies} >
	               			<div>
	               			Type Of Currency:
	               			<br/>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Bitcoin" className="btn btn-lg btn-block" />Bitcoin
	             			<br/>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Litecoin" className="btn btn-lg btn-block" />Litecoin
	             			<br/>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Etherium" className="btn btn-lg btn-block" />Etherium
	             			</div>
	             			Number of units:  				
				          	<input ref="numberOfUnits" type="text" />
				          	<br/>
				          	<div>
				          	Pay with: Cash
	             			</div>
	             			<div>
	             			<br/>
	             			<button type="submit" className="btn btn-success" >Buy</button>
	             			<button type="button" className="btn btn-danger" onClick= {this.props.close}>Cancel</button>
	             			</div>
				        </form>
	              </div>
	              <div className="modal-footer">
	              	<button type="button" className="btn btn-danger" onClick= {this.props.close}>Close</button>
	              </div>
	            </div>
	          </div>
	        </div>
		)
	}
}
export default BuyCurrenciesModal
