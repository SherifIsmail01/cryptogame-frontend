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
			values: {},
			disclaimer: '',
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
		fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
		.then(res => res.json())
		.then(json => {
			console.log(json);
			this.setState({
				values: json.bpi,
				disclaimer: json.disclaimer
			});
		});
	}

	render() {

		const { values }  = this.state;

		const dates = Object.keys(values).map(date => {
			return date;
		})

		const prices = Object.values(values).map(p => {
			return p;
		})

		return (
			<div>
			    <div className="row">
		            <div className="col-12 signup">	
		              	<button onClick={ this.showSignUpModal } ref="signup" className="btn btn-outline-secondary btn-default signup-button">Sign Up</button>
		            </div>
		      	</div>
		          	{ this.state.showSignUpModal ? <SignUpModal myHistory={ this.props.history } signUp={ this.addUser } close={ this.closeSignUpModal }/> : null }
		        <br />
		        <div className="date">Date: {moment().format('MMMM Do YYYY')}</div>

			    <div className="chart">
					<ReactHighCharts config = { {
						title: {
							text: 'Bitcoin Price last 30 days'
						},
				        xAxis: {
				        	type: 'datetime',
		        	        dateTimeLabelFormats: {
					            day: '%e of %b',
					            month: '%b \'%y',
					        }
				        },
				        series: [{
				        	type: 'line',
				            data: prices,
				            name: 'Bitcoin',
				        	pointStart: Date.parse(dates[0]),
				        	pointInterval: 24 * 1000 * 3600
				        }]

					} } ref="chart">
					</ReactHighCharts>

					Powered By: <Link to={"https://www.coindesk.com/price/"} target="_blank">CoinDesk</Link>
					<p className="disclaimer">
						{this.state.disclaimer}
					</p>

				</div>
			</div>
		)
	}
}

export default HomePage
