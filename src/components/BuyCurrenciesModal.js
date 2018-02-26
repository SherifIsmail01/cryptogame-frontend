import React, { Component } from 'react';


class BuyCurrenciesModal extends Component {
	constructor() {
		super();
		this.buyCurrencies = this.buyCurrencies.bind(this);
		this.state = {
			accounts: [],
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
		e.preventDefault();
		console.log({
				Bitcoin: 2000,
				Litecoin: 100,
				Etherium: 400,
				currency_to_buy: this.state.buy,
				num_of_units: this.refs.numberOfUnits.value,
				payment_type: "Cash"
			});
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userId}/accounts/buy`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				Bitcoin: 2000,
				Litecoin: 100,
				Etherium: 400,
				currency_to_buy: this.state.buy,
				num_of_units: this.refs.numberOfUnits.value
			})
			}).then((res) => {
				return res.json()
			}).then((newAccounts) => {
				console.log(newAccounts)
				this.props.accountsAfterPurchase(newAccounts)
		})
	}

	render() {
		return (
			<div className="modal fade show" style={{display: 'block'}}>
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="BuyCurrenciesModalLabel">Buy Currencies</h5>
	              </div>
	              <div className="modal-body">
	               		<form onSubmit= {this.buyCurrencies}>
	               			<div>
	               			Type Of Currency:
	               			<br>
	               			</br>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Bitcoin" className="btn btn-lg btn-block" />Bitcoin
	             			<br>
	             			</br>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Litecoin" className="btn btn-lg btn-block" />Litecoin
	             			<br>
	             			</br>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Etherium" className="btn btn-lg btn-block" />Etherium
	             			</div>
	             			Number of units:  				
				          	<input ref="numberOfUnits" type="text" placeholder="number of units" />
				          	<br>
				          	</br>
				          	<div>
				          	Pay with: Cash
	             			</div>
	             			<div>
	             			<br>
	             			</br>
	             			<button type="submit" className="btn btn-success" >Buy</button>
	             			<button type="button" className="btn btn-danger" onClick= {this.props.close}>Cancel</button>
	             			</div>
				        </form>
	              </div>
	              <div className="modal-footer">
	              </div>
	            </div>
	          </div>
	        </div>
		)
	}
}
export default BuyCurrenciesModal
