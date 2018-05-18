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

	render() {
			var chart;
		return (
			<div>
			    <div className="row">
		            <div className="col-12 signup">	
		              	<button onClick={ this.showSignUpModal } ref="signup" className="btn btn-outline-secondary btn-default signup-button">Sign Up</button>
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
							text: 'Crypto Currencies sample Market Price'
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
				            data: [39, 72, 48, 189, 124, 421, 333, 201, 166, 98, 59, 114],
				            name: 'Bitcoin',
				            pointStart: Date.UTC(2018, 3, 3),
				            pointInterval: 24 * 3600 * 1000
				        }, {
				        	type: 'line',
				        	data: [37, 41, 72, 30, 104, 123, 115, 99, 77, 64, 132, 156, 192],
				        	name: 'Litecoin',
				        	pointStart: Date.UTC(2018, 3, 3),
				            pointInterval: 24 * 3600 * 1000
				        }, {
				        	type: 'line',
				        	data: [14, 82, 35, 42, 46, 52, 71, 83, 119, 80, 301, 224, 95],
				        	name: 'Etherium',
				        	pointStart: Date.UTC(2018, 3, 3),
				            pointInterval: 24 * 3600 * 1000
				        }]
					} } ref="chart">
					</ReactHighCharts>
					Powered By: <Link to={"https://www.coindesk.com/price/"} target="_blank">CoinDesk</Link>
				</div>
			</div>
		)
	}
}

export default HomePage
