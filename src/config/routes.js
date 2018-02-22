import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage.js';
import Users from '../components/Users.js';

export default (
	<Switch>
		<Route exact path='/' component= { HomePage }/>
		<Route exact path='/users' component= { Users }/> 
	</Switch>
	)