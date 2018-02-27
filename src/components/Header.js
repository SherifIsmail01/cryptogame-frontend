import React, { Component } from 'react';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor() {
		super();
		}	
	

	render() {
		return (
			<div>
				<header className="App-header">
		          <div className="row">
		            <div className="col-12">
		              <h1 className="App-title">Crypto Game</h1>
		            </div>
		           	<Link to='/' className="btn btn-outline-primary btn-default homepage-button">HomePage</Link>
		          </div>
		        </header>
			</div>
		)
	}
}
export default Header;
