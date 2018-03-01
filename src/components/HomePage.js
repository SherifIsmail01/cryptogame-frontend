import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHighCharts from 'react-highcharts';
import Users from './Users';
import SignUpModal from './SignUpModal';



class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			users: '',
			showSignUpModal: false,
			accountsTransactions: []
		}
		this.showSignUpModal = this.showSignUpModal.bind(this);
		this.closeSignUpModal = this.closeSignUpModal.bind(this);
		this.addUser = this.addUser.bind(this);
	}

	showSignUpModal() {
		this.setState({
			showSignUpModal: true
		})
	}
	closeSignUpModal() {
		this.setState({
			showSignUpModal: false
		})
	}

	addUser(user) {
		this.setState({
			users: this.state.users.concat(user)
		})
	}

	componentDidMount() {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts.json`, {
			method: "GET"
			}).then((res) => {
				return res.json()
			}).then((accounts) => {
				console.log(accounts)
				this.setState({accountsTransactions: accounts})
		});
	}


	render() {
		var times = this.state.accountsTransactions.map((account) => {
			return account.updated_at
		})
		let splitedTimes = times
		console.log(splitedTimes)
		let allTimes = splitedTimes.map((time) => {
			return time.slice(0, 10)
		})
		// let updatedTimes = splitedTimes.splice(0, 10)
		return (
			<div>
				<h1>Welcome to Crypto Game</h1>
					{allTimes.join('')}
				    <div className="row">
			            <div className="col-12 signup">	
			              	<button onClick={ this.showSignUpModal } ref="signup" className="btn btn-outline-secondary btn-md btn-default signup-button">Sign Up</button>
			            </div>
			      	</div>
			          { this.state.showSignUpModal ? <SignUpModal myHistory={ this.props.history } signUp={ this.addUser } close={ this.closeSignUpModal }/> : null }
			         <br />
				    <div className="chart">
					<ReactHighCharts config = { {
									title: {
										text: 'Trading Transactions'
									},
							        xAxis: {
							        	type: 'datetime',
							        	dateTimelabelFormats: {
							        		day: '%e of %b'
							        	}
							        },
							        yAxis: {
							            categories: [5, 10]
							        },
							        series: [{
							        	type: 'line',
							            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 254.4],
							            name: 'Bitcoin',
							            pointStart: Date.UTC(2018, 1, 1),
							            pointInterval: 24 * 3600 * 1000
							        }, {
							        	type: 'line',
							        	data: [20, 7, 10, 29.2, 44.0, 76.0, 35.6, 48.5, 26.4, 94.1, 95.6, 45.4],
							        	name: 'Litcoin',
							        	pointStart: Date.UTC(2018, 1, 1),
							            pointInterval: 24 * 3600 * 1000
							        }, {
							        	type: 'line',
							        	data: [230, 72, 100, 219.2, 144.0, 176.0, 135.6, 248.5, 126.4, 94.1, 95.6, 145.4],
							        	name: 'Etherium',
							        	pointStart: Date.UTC(2018, 1, 1),
							            pointInterval: 24 * 3600 * 1000
							        }]
								} } ref="chart">
					</ReactHighCharts>
					</div>
			</div>
		)
	}
}

export default HomePage
