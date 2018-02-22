import React, { Component } from 'react';

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
		          </div>
		        </header>
			</div>
		)
	}
}
export default Header;
