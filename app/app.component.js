System.register(['angular2/core', 'angular2/router', './login/login.component', './login/login.service', './emp-dashboard/emp.dashboard.component', './admin-dashboard/admin.dashboard.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_component_1, login_service_1, emp_dashboard_component_1, admin_dashboard_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (emp_dashboard_component_1_1) {
                emp_dashboard_component_1 = emp_dashboard_component_1_1;
            },
            function (admin_dashboard_component_1_1) {
                admin_dashboard_component_1 = admin_dashboard_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Screen Magic Chat';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent, emp_dashboard_component_1.EmpDashboardComponent, admin_dashboard_component_1.AdminDashboardComponent],
                        providers: [router_1.ROUTER_PROVIDERS, login_service_1.LoginService]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/emp-dashboard/:email',
                            name: 'EmpDashboard',
                            component: emp_dashboard_component_1.EmpDashboardComponent
                        },
                        {
                            path: '/admin-dashboard',
                            name: 'AdminDashboard',
                            component: admin_dashboard_component_1.AdminDashboardComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map