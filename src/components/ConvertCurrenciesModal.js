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

	// 1. Load live prices into the modal state when it mounts
	componentDidMount() {
		this.fetchLivePrices();
	}

	fetchLivePrices() {
		// Fetch all three coin prices at once via your secure Rails spot endpoint
		// to get accurate conversion metrics
		const coins = ['bitcoin', 'litecoin', 'ethereum'];
		
		coins.forEach(coinId => {
			fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto_rates/spot/${coinId}`)
				.then(res => res.json())
				.then(data => {
					this.setState({
						[`${coinId}LivePrice`]: data[coinId].usd
					});
					console.log(`Live convert rate for ${coinId}: $${data[coinId].usd}`);
				})
				.catch(err => console.error(`Error fetching conversion price for ${coinId}:`, err));
		});
	}

	onChangeConvertedFromCurrency(e) {
		this.setState({ convertFrom: e.target.value });
	}

	onChangeConvertedToCurrency(e) {
		this.setState({ convertTo: e.target.value });
	}

	convertCurrencies(e) {
		e.preventDefault();

		const fromCoin = (this.state.convertFrom || 'Bitcoin').toLowerCase();
		const toCoin = (this.state.convertTo || 'Bitcoin').toLowerCase();

		// Fallback check to ensure the numbers loaded from your proxy endpoint
		if (!this.state[`${fromCoin}LivePrice`] || !this.state[`${toCoin}LivePrice`]) {
			alert("Syncing market exchange rates. Please wait a second and try again.");
			return;
		}

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userIdConverting}/convert`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				// ✅ DYNAMIC: Pass your active component state price variables
				Bitcoin: this.state.bitcoinLivePrice || 10703.9675,
				Litecoin: this.state.litecoinLivePrice || 220.755,
				Ethereum: this.state.ethereumLivePrice || 886.96,
				
				convert_from_currency: this.state.convertFrom || 'Bitcoin',
				num_of_units_of_converted_from_currency: this.refs.numberOfUnitsOfConvertedFromCurrency.value,
				convert_to_currency: this.state.convertTo || 'Bitcoin'
			})
		}).then((res) => {
			console.log(res)
			if (res.status === 200) {
				res.json().then((convertedAccounts) => {
					console.log(convertedAccounts)
					this.props.accountsAfterConversion(convertedAccounts);
					if (this.props.close) this.props.close(); // Close modal on successful swap
				})
			} else if (res.status === 400) {
				alert("Insufficient amount, please increase number of units or change currency");
			} else {
				alert("Incorrect number of units");
			}
		}).catch(err => console.error("Conversion fetch error:", err));
	}


	render() {
		return (
			/* 1. FIXED BACKDROP LAYER: Blurs background screen and catches escape close click actions */
			<div className="modal-backdrop-wrapper" style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				zIndex: 3000,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}} onClick={this.props.close}>
				
				{/* 2. INNER MODAL CONTAINER BOX */}
				<div className="modal-dialog m-0" role="document" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '460px', zIndex: 3001 }}>
					<div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
						
						{/* 3. MODAL HEADER */}
						<div className="modal-header bg-primary text-white p-3 d-flex justify-content-between align-items-center" style={{ borderBottom: 'none' }}>
							<h5 className="modal-title m-0 font-weight-bold" style={{ fontSize: '1.2rem', color: '#ffffff' }}>Convert Game Currencies</h5>
							<button type="button" className="close text-white border-0 bg-transparent font-weight-light" style={{ fontSize: '1.75rem', outline: 'none', cursor: 'pointer' }} onClick={this.props.close}>&times;</button>
						</div>

						{/* 4. MODAL BODY FORM WRAPPER */}
						<div className="modal-body p-4 bg-white" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
							<form onSubmit={this.convertCurrencies}>
								
								{/* DROP BOX: CONVERT FROM ASSET ROW */}
								<div className="form-group mb-3">
									<label className="small font-weight-bold text-muted mb-1">Convert From Asset Source:</label>
									<select 
										onChange={this.onChangeConvertedFromCurrency} 
										value={this.state.convertFrom || 'Bitcoin'} 
										className="form-control"
										style={{ borderRadius: '6px', fontSize: '15px', padding: '8px 12px' }}
									>
										<option value="Bitcoin">Bitcoin</option>
										<option value="Litecoin">Litecoin</option>
										<option value="Ethereum">Ethereum</option>
									</select>
								</div>

								{/* INPUT METRIC NUMBER ROW */}
								<div className="form-group mb-3">
									<label className="small font-weight-bold text-muted mb-1">Number of Units to Spend:</label>
									<input 
										ref="numberOfUnitsOfConvertedFromCurrency" 
										type="number" 
										step="any"
										placeholder="0.00"
										className="form-control"
										style={{ borderRadius: '6px', fontSize: '15px', padding: '8px 12px' }}
										required
									/>
								</div>

								{/* DROP BOX: CONVERT TO TARGET ASSET ROW */}
								<div className="form-group mb-4">
									<label className="small font-weight-bold text-muted mb-1">Convert To Target Asset:</label>
									<select 
										onChange={this.onChangeConvertedToCurrency} 
										value={this.state.convertTo || 'Bitcoin'} 
										className="form-control"
										style={{ borderRadius: '6px', fontSize: '15px', padding: '8px 12px' }}
									>
										<option value="Bitcoin">Bitcoin</option>
										<option value="Litecoin">Litecoin</option>
										<option value="Ethereum">Ethereum</option>
									</select>
								</div>

								{/* 5. INTERACTION SUBMISSION AND ESCAPE ACTIONS DECK BLOCK */}
								<div className="actions-button-deck mt-2">
									<button type="submit" className="btn btn-primary w-100 font-weight-bold py-2 mb-2" style={{ borderRadius: '8px', fontSize: '16px' }}>
										Execute Conversion Swap
									</button>
									<button type="button" className="btn btn-light text-secondary w-100 font-weight-bold py-2" style={{ borderRadius: '8px', fontSize: '15px', border: '1px solid #e2e8f0' }} onClick={this.props.close}>
										Cancel & Close Window
									</button>
								</div>

							</form>
						</div>

					</div>
				</div>

			</div>
    	);
	}

}
export default ConvertCurrenciesModal

