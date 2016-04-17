import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class LoginService {

	firebaseUrl: string;
	firebaseRef: Firebase;
	isLoggedIn: boolean;
	authData: any;

	constructor(private _router: Router) {
		this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
		this.firebaseRef = new Firebase(this.firebaseUrl);
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
			console.log('Login Error: Please try again.');
		}
		
	}

	authHandler(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	    //alertify.error("Login Failed!");
	  } else {
	    let link = ['EmpDashboard', {email: authData.password.email, gravatar: authData.password.profileImageURL}];
 		this._router.navigate(link);
	  }
	}
}
