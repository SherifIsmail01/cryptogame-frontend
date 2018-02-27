import React, { Component } from 'react';


class ConvertCurrenciesModal extends Component {
	constructor() {
		super();
		this.state = {
			convertFrom: null,
			convertTo: null
		}
		this.convertCurrencies = this.convertCurrencies.bind(this);
		this.onChangeConvertedToCurrency = this.onChangeConvertedToCurrency.bind(this);
		this.onChangeConvertedFromCurrency = this.onChangeConvertedFromCurrency.bind(this);
	}

	onChangeConvertedFromCurrency(e) {
		this.setState({
			convertFrom: e.target.value
		})
	}

	onChangeConvertedToCurrency(e) {
		this.setState({
			convertTo: e.target.value
		})
	}

	convertCurrencies(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userId}/accounts/convert`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				Bitcoin: 10703.9675,
				Litecoin: 220.755,
				Etherium: 886.96,
				convert_from_currency: this.state.convertFrom,
				num_of_units_of_converted_from_currency: this.refs.numberOfUnitsOfConvertedFromCurrency.value,
				convert_to_currency: this.state.convertTo
			})
			}).then((res) => {
				return res.json()
			}).then((convertedAccounts) => {
				this.props.accountsAfterConversion(convertedAccounts);
		});
	}

	render() {
		return (
			<div className="modal fade show">
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
	                <h5 className="modal-title" id="ConvertCurrenciesModalLabel">Convert Currencies</h5>
	              </div>
	              <div className="modal-body">
	               		<form onSubmit= {this.convertCurrencies}>
	               			<div>
	               			Convert from:
	               			<br/>
	     	             	<input onChange={this.onChangeConvertedFromCurrency} type="radio" name="convertFrom" value="Bitcoin" className="btn btn-lg btn-block" />Bitcoin
	             			<br/>
	             			<input onChange={this.onChangeConvertedFromCurrency} type="radio" name="convertFrom" value="Litecoin" className="btn btn-lg btn-block" />Litecoin
	             			<br/>
	             			<input onChange={this.onChangeConvertedFromCurrency} type="radio" name="convertFrom" value="Etherium" className="btn btn-lg btn-block" />Etherium
	             			</div>
	             			<div>
	             			Number of units to convert: 				
				          	<input ref="numberOfUnitsOfConvertedFromCurrency" type="text"/>
				          	</div>
				          	<div>
				          	<br/>
				          	Convert to:
				          	<br/>
				          	<input onChange={this.onChangeConvertedToCurrency} type="radio" name="convertTo" value="Bitcoin"  className="btn btn-lg btn-block" />Bitcoin
				          	<br/>
	             			<input onChange={this.onChangeConvertedToCurrency} type="radio" name="convertTo" value="Litecoin"  className="btn btn-lg btn-block" />Litecoin
	             			<br/>
	             			<input onChange={this.onChangeConvertedToCurrency} type="radio" name="convertTo" value="Etherium"  className="btn btn-lg btn-block" />Etherium
	             			<br/>
	             			<button type="submit" className="btn btn-success" >Convert</button>
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
export default ConvertCurrenciesModal
