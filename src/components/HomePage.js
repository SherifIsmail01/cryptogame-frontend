import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHighCharts from 'react-highcharts';
import Users from './Users';
import SignUpModal from './SignUpModal';
import moment from 'moment';
import $ from 'jquery';
import { Link } from 'react-router-dom';



class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: '',
			showSignUpModal: false,
			accountsTransactions: [],
			currentLitecoinPrice: '',
			currentEtheriumPrice: '',
			currentBitcoinPrice: ''
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
		$.ajax({
			method: "GET",
			url: "https://api.coindesk.com/v1/bpi/currentprice.json",
			dataType: "json",
			error:  (error) => {
				console.log(error)
			},
			success:  (data) => {
				console.log(data.bpi.USD.rate_float)
				this.setState({
				 	currentBitcoinPrice: data.bpi.USD.rate_float
				}) 
			}
		});
		$.ajax({
			method: "GET",
			url: "http://coincap.io/front",
			dataType: "json",
			error:  (error) => {
				console.log(error)
			},
			success:  (data) => {
				console.log(data[4].price)
				 this.setState({
					currentLitecoinPrice: data[4].price
				});
			}
		});
		$.ajax({
			method: "GET",
			url: "http://coincap.io/front",
			dataType: "json",
			error:  (error) => {
				console.log(error)
			},
			success:  (data) => {
				console.log(data[1].price)
				 this.setState({
					currentEtheriumPrice: data[1].price
				})
			}
		});
	}


	render() {
			// var Bitcoin = {this.state.currentBitcoinPrice}
			// var Litecoin = {this.state.currentLitecoinPrice}
			// var Etherium = {this.state.currentEtheriumPrice}
		return (

			<div>
				<h1>Welcome to Crypto Game</h1>

				    <div className="row">
			            <div className="col-12 signup">	
			              	<button onClick={ this.showSignUpModal } ref="signup" className="btn btn-outline-secondary btn-md btn-default signup-button">Sign Up</button>
			            </div>
			      	</div>
			          { this.state.showSignUpModal ? <SignUpModal myHistory={ this.props.history } signUp={ this.addUser } close={ this.closeSignUpModal }/> : null }
			         <br />
			  		{this.state.accountsTransactions.map((Transactions) => {
					 		return <li>{moment().format(Transactions.updated_at)}</li>
					 	})}
			         <div className="date">Date: {moment().format('MMMM Do YYYY')}</div>

				    <div className="chart">
					<ReactHighCharts config = { {
									title: {
										text: 'Crypto Currencies Market Price'
									},
							        xAxis: {
							        	type: 'datetime',
							        	dateTimelabelFormats: {
							        		day: '%e of %b',
							        		month: '%b \'%y',
							        		year: '%Y'
							        	}
							        },
							        yAxis: {
							            categories: [100, 200]
							        },
							        series: [{
							        	type: 'line',
							            data: [this.state.currentBitcoinPrice],
							            name: 'Bitcoin',
							            pointStart: Date.UTC(2018, 3, 3),
							            pointInterval: 24 * 3600 * 1000
							        }, {
							        	type: 'line',
							        	data: [this.state.currentLitecoinPrice],
							        	name: 'Litecoin',
							        	pointStart: Date.UTC(2018, 3, 3),
							            pointInterval: 24 * 3600 * 1000
							        }, {
							        	type: 'line',
							        	data: [this.state.currentEtheriumPrice],
							        	name: 'Etherium',
							        	pointStart: Date.UTC(2018, 3, 3),
							            pointInterval: 24 * 3600 * 1000
							        }]
								} } ref="chart">
					</ReactHighCharts>
					Powered By: <Link to={"https://www.coindesk.com/price/"} target="_blank">CoinDesk</Link>
					</div>
			}
			
			</div>
		)
	}
}

export default HomePage
