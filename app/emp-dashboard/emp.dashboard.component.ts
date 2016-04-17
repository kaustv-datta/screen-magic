import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { TopicsComponent } from '../topics/topics.component';
import { ChatComponent } from '../chat/chat.component';

import { TopicsService } from '../topics/topics.service';

@Component({
  selector: 'emp-dashboard',
  templateUrl: 'app/emp-dashboard/emp.dashboard.component.html',
  directives: [TopicsComponent, ChatComponent],
  providers: [TopicsService]
})

export class EmpDashboardComponent implements OnInit {
	email: string;
	gravatar: string;

	constructor(
	    private _routeParams: RouteParams) {
	  }

	ngOnInit() {
	    this.email = this._routeParams.get('email');
	    this.gravatar = this._routeParams.get('gravatar');
    }

}
