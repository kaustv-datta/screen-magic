import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class LoginService {

	firebaseUrl: string;
	firebaseRef: Firebase;
	usersRef: Firebase;
	isLoggedIn: boolean;
	authData: any;

	constructor(private _router: Router) {
		this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
		this.firebaseRef = new Firebase(this.firebaseUrl);
		this.usersRef = this.firebaseRef.child('users');
		this.firebaseRef.onAuth((user) => {
			if (user) {
				this.authData = user;
				this.isLoggedIn = true;
			}
		});
	}


	loginUser(id: string, password: string, callback) {

		try {

			this.firebaseRef.authWithPassword({
			  email    : id,
			  password : password
			}, this.authHandler.bind(this));
		} catch (e) {
			alertify.error("Login Error: Please try again.");
		}
		
	}

	authHandler(error, authData) {
	  if (error) {
	    alertify.error("Login Error: Please try again.");
	  } else {
	  	alertify.success('Please wait while we log you in.');

	  	var username = authData.password.email.split('@')[0];
	  	var onuserdata = this.usersRef.child(username).once('value', function (dataSnapshot) {
	  		var userDetails = dataSnapshot.val();

	  		if (userDetails.admin) {
	  			let link = ['AdminDashboard'];
	  			this._router.navigate(link);
	  		} else {
	  			if (userDetails.hasAccess) {
	  				let link = ['EmpDashboard', {email: authData.password.email, gravatar: authData.password.profileImageURL}];
 					this._router.navigate(link);
	  			} else {
	  				alertify.error("Permission Issue: Contact Admin.");
	  			}
	  			
	  		}
	  	},function (err) {console.log(err);}, this);
	  	//this.usersRef.child(username).off('value', onuserdata);
	  	//this.usersRef.child(username).off();
	  }
	}
}
