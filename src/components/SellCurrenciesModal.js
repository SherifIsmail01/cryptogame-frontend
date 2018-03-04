import React, { Component } from 'react';


class SellCurrenciesModal extends Component {
	constructor() {
		super();
		this.state = {
			accounts: [],
			sell: null
		}
		this.sellCurrencies = this.sellCurrencies.bind(this);
		this.onChangeSellCurrency = this.onChangeSellCurrency.bind(this);
	}

	onChangeSellCurrency(e) {
		this.setState({
			sell: e.target.value
		})
	}

	sellCurrencies(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userIdSelling}/sell`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				Bitcoin: 10703.9675,
				Litecoin: 220.755,
				Etherium: 886.96,
				currency_to_sell: this.state.sell,
				num_of_units: this.refs.numberOfUnits.value,
				sold_for: "Cash"
			})			
			}).then((res) => {
				if (res.status === 200) {
					 res.json().then((updatedAccounts) => {
				this.props.accountsAfterSale(updatedAccounts)})
				} else {
					e.preventDefault();
					alert("Incorrect number of units");
				}
		})
	}

	render() {
		return (
			<div className="modal fade show modal-lg">
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="SellCurrenciesModalLabel">Sell Currencies</h5>
	              </div>
	              <div className="modal-body">
	               		<form onSubmit= {this.sellCurrencies}>
	               			<div>
	               			Select Currency to sell:
	               			<br/>
	             			<input onChange={this.onChangeSellCurrency} type="radio" name="currency" value="Bitcoin" className="btn btn-lg btn-block" />Bitcoin
	             			<br/>
	             			<input onChange={this.onChangeSellCurrency} type="radio" name="currency" value="Litecoin" className="btn btn-lg btn-block" />Litecoin
	             			<br/>
	             			<input onChange={this.onChangeSellCurrency} type="radio" name="currency" value="Etherium" className="btn btn-lg btn-block" />Etherium
	             			</div>
	             			<div>
	             			Number of units:  				
				          	<input ref="numberOfUnits" type="text"/>
				          	</div>
				          	<div>
				          	Sell for: Cash
	             			</div>
	             			<div>
	             			<button type="submit" className="btn btn-success" >Sell</button>
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
export default SellCurrenciesModal
