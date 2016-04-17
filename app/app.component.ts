import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { LoginComponent } from './login/login.component';
import { LoginService }     from './login/login.service';
import { EmpDashboardComponent } from './emp-dashboard/emp.dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin.dashboard.component';

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	directives: [ROUTER_DIRECTIVES, LoginComponent, EmpDashboardComponent, AdminDashboardComponent],
	providers: [ROUTER_PROVIDERS, LoginService]
})

@RouteConfig([
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent,
		useAsDefault: true
	},
	{
		path: '/emp-dashboard/:email',
		name: 'EmpDashboard',
		component: EmpDashboardComponent
	},
	{
		path: '/admin-dashboard',
		name: 'AdminDashboard',
		component: AdminDashboardComponent
	}
])

export class AppComponent {
	title = 'Screen Magic Chat'; 
}