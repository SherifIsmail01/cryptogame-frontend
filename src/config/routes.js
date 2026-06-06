import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../components/HomePage.js';
import Users from '../components/Users.js';
import UserProfile from '../components/UserProfile.js';
import SignInModal from '../components/SignInModal.js';

function AppRoutes() {
	return (
		<Switch>
			<Route exact path='/' component= { HomePage }/>
			<Route exact path='/users' component= { Users }/> 
			<Route exact path='/profile/:user_id' component= { UserProfile }/>
			<Route exact path='/login' component= { SignInModal }/>
		</Switch>
	);
}


export default AppRoutes;