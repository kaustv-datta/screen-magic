import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { LoginService } from './login.service';

@Component({
    selector: 'my-login',
    templateUrl: 'app/login/login.component.html'
})

export class LoginComponent {

	constructor(private _loginService: LoginService, 
		private _router: Router) {}

	email: string;
	password: string;

	loginUser () {
		this._loginService.loginUser(this.email, this.password, this.navigateToDashboard.bind(this));
	}

	navigateToDashboard (error, authData) {
	}

}
