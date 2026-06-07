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


		// 1. Add this lifecycle method to automatically load the spot price when the popup opens
	componentDidMount() {
		// Use the currently selected dropdown coin or default to bitcoin
		const initialCoin = (this.state && this.state.buy) || 'bitcoin';
		this.fetchLiveSpotPrice(initialCoin);
	}

	fetchLiveSpotPrice(coinId) {
		const formattedId = coinId.toLowerCase();
		
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto_rates/spot/${formattedId}`)
			.then(res => res.json())
			.then(data => {
				// CoinGecko structure: data['bitcoin']['usd']
				const livePrice = data[formattedId].usd;
				this.setState({ currentLiveSpotPrice: livePrice });
				console.log(`Live spot price for ${formattedId} loaded: $${livePrice}`);
			})
			.catch(err => console.error("Error fetching modal spot price:", err));
	}

	// 2. Update your existing dropdown change handler to fetch the new price when switching coins
	onChangeBuyCurrency(e) {
		const selectedCoin = e.target.value;
		this.setState({ buy: selectedCoin });
		this.fetchLiveSpotPrice(selectedCoin); // Instantly pulls the fresh rate for the newly chosen coin
	}
	
	buyCurrencies(e) {
		e.preventDefault();

		// Fallback checking to make sure data is loaded before clicking buy
		if (!this.state.currentLiveSpotPrice) {
			alert("Loading live crypto price data. Please wait a second and try again.");
			return;
		}

		const chosenCurrencyName = this.state.buy || 'Bitcoin';

		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.userIdBuying}/buy`, {
			method: "PUT",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				// ✅ DYNAMIC: Pass the real live fetched price parameter instead of old hardcoded numbers
				Bitcoin: chosenCurrencyName.toLowerCase() === 'bitcoin' ? this.state.currentLiveSpotPrice : 63384.29,
				Litecoin: chosenCurrencyName.toLowerCase() === 'litecoin' ? this.state.currentLiveSpotPrice : 43.34,
				Ethereum: chosenCurrencyName.toLowerCase() === 'ethereum' ? this.state.currentLiveSpotPrice : 1728.06,
				
				currency_to_buy: chosenCurrencyName,
				num_of_units: this.refs.numberOfUnits.value
			})
		}).then((res) => {
			console.log(res)
			if (res.status === 200) {
				res.json().then((accounts) => {
					console.log(accounts)
					this.props.accountsAfterPurchase(accounts);
					if (this.props.close) this.props.close(); // Closes modal cleanly on successful purchase
				})
			} else {
				alert("Insufficient Funds");
			}
		}).catch(err => console.error("Purchase execution error:", err));
	}


		render() {
		return (
			/* BACKDROP OVERLAY BACKDROP LAYER */
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
				
				{/* INNER MODAL FRAME */}
				<div className="modal-dialog m-0" role="document" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '450px', zIndex: 3001 }}>
					<div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
						
						{/* HEADER BLOCK */}
						<div className="modal-header bg-success text-white p-3 d-flex justify-content-between align-items-center" style={{ borderBottom: 'none' }}>
							<h5 className="modal-title m-0 font-weight-bold" style={{ fontSize: '1.2rem', color: '#ffffff' }}>Buy Game Currencies</h5>
							<button type="button" className="close text-white border-0 bg-transparent font-weight-light" style={{ fontSize: '1.75rem', outline: 'none', cursor: 'pointer' }} onClick={this.props.close}>&times;</button>
						</div>

						{/* FORM WRAPPER BODY */}
						<div className="modal-body p-4 bg-white" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
							<form onSubmit={this.buyCurrencies}>
								
								{/* COIN TYPE SELECT DROPDOWN */}
								<div className="form-group mb-3">
									<label className="small font-weight-bold text-muted mb-1">Select Currency Asset to Purchase:</label>
									<select 
										onChange={this.onChangeBuyCurrency} 
										value={this.state.buy || 'Bitcoin'} 
										className="form-control"
										style={{ borderRadius: '6px', fontSize: '15px', padding: '8px 12px' }}
									>
										<option value="Bitcoin">Bitcoin</option>
										<option value="Litecoin">Litecoin</option>
										<option value="Ethereum">Ethereum</option>
									</select>
								</div>

								{/* LIVE PRICE PREVIEW BOX */}
								<div className="p-3 mb-3 border rounded text-center bg-light">
									<span className="small text-muted font-weight-bold d-block">Current Market Rate:</span>
									<span className="h4 text-success font-weight-bold">
										${this.state.currentLiveSpotPrice ? this.state.currentLiveSpotPrice.toLocaleString() : "Loading..."}
									</span>
								</div>

								{/* NUMBER OF UNITS FIELD */}
								<div className="form-group mb-4">
									<label className="small font-weight-bold text-muted mb-1">Number of Units to Buy:</label>
									<input 
										ref="numberOfUnits" 
										type="number" 
										step="any"
										placeholder="0.00"
										className="form-control"
										style={{ borderRadius: '6px', fontSize: '15px', padding: '8px 12px' }}
										required
									/>
								</div>

								{/* INLINE CONTROL PANEL BUTTONS */}
								<div className="actions-button-deck mt-2">
									<button type="submit" className="btn btn-success w-100 font-weight-bold py-2 mb-2" style={{ borderRadius: '8px', fontSize: '16px' }}>
										Confirm Purchase Order
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
export default BuyCurrenciesModal
