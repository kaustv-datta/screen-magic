import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'app/admin-dashboard/admin.dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit {

	firebaseUrl: string;
	firebaseRef: Firebase;
	usersRef: Firebase;
	isLoggedIn: boolean;
	authData: any;
	users: any[];

	constructor() {
		this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
		this.firebaseRef = new Firebase(this.firebaseUrl);
		this.usersRef = this.firebaseRef.child('users');
	}

	ngOnInit() {
		var userValChange = this.usersRef.on('value', function (dataSnapshot){
			var users = dataSnapshot.val();
			this.users = this.parseUsersData(users);
		},function (err) {console.log(err);}, this);
    }

    parseUsersData (usersData) {
    	var users = [];

    	for (var member in usersData) {
    		if (!usersData[member].admin) {
    			users.push({
    				name: member,
    				email: usersData[member].email,
    				hasAccess: usersData[member].hasAccess
    			});
    		}
    	}

    	return users;
    }

    changeAccess (user, hasAccess) {
    	//setTimeout( () => this.offendingAction(), 0)
    	try {
    		this.usersRef.child(user.name).child('hasAccess').set(hasAccess);
    	} catch (e) {
    		console.log(e);
    	}
    	
    }

    goBack () {
    	window.history.back();
    }

}
