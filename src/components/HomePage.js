import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHighCharts from 'react-highcharts';
import Users from './Users';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';



class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			newUser: '',
			accountsTransactions: []
		}
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
		let arr = []
		let times =  this.state.accountsTransactions.map((account) => {
						let transactionTime = account.updated_at.slice(0, 10)
						  return transactionTime }) 
		// let time = [times.map((time) => {return time})]
		return (
			<div>
				<h1>Welcome to Crypto Game</h1>
				    <div>
				    	Transaction Times: {this.state.accountsTransactions.map((account) => {
						let transactionTime = account.updated_at
						  return transactionTime })}
				    </div>
					<ReactHighCharts config = { {
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
					<div className="usercomponent">
						<Users />
					</div>
			</div>
		)
	}
}

export default HomePage
