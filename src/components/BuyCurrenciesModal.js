import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class BuyCurrenciesModal extends Component {
	constructor() {
		super();
		this.state = {
			buy: null
		}
		this.onChangeBuyCurrency = this.onChangeBuyCurrency.bind(this);
		this.buyCurrencies = this.buyCurrencies.bind(this);
	}


	onChangeBuyCurrency(e) {
		this.setState({
			buy: e.target.value
		})
	}
	
	buyCurrencies(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userIdBuying}/buy`, {
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
				console.log(res)
				if (res.status === 200) {
					 res.json().then((accounts) => {
					 	console.log(accounts)
				this.props.accountsAfterPurchase(accounts)})
				} else {
					e.preventDefault();
					alert("Insufficient Funds");
				}
		})
	}

	render() {
		return (
			<div className="modal fade show" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	          <div className="modal-dialog modal-dialog-centered"  role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="BuyCurrenciesModalLabel">Buy Currencies</h5>
	              </div>
	              <div className="modal-body">
	               		<form onSubmit= {this.buyCurrencies} >
	               			<div>
	               			Type Of Currency:
	               			<br/>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Bitcoin"  />Bitcoin
	             			<br/>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Litecoin"  />Litecoin
	             			<br/>
	             			<input onChange={this.onChangeBuyCurrency} type="radio" name="currency" value="Etherium"  />Etherium
	             			</div>
	             			<br/>
	             			Number of units:  				
				          	<input ref="numberOfUnits" type="text" />
				          	<div>
				          	<br/>
				          	Pay with: Cash
	             			</div>
	             			<br/>
	             			<div>
	             			<button color="primary" type="submit" className="btn btn-success">Buy</button>
	             			<button color="secondary" type="button" className="btn btn-danger" onClick={this.props.close}>Cancel</button>
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
