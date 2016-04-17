System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LoginService = (function () {
                function LoginService(_router) {
                    var _this = this;
                    this._router = _router;
                    this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
                    this.firebaseRef = new Firebase(this.firebaseUrl);
                    this.firebaseRef.onAuth(function (user) {
                        if (user) {
                            _this.authData = user;
                            _this.isLoggedIn = true;
                        }
                    });
                }
                LoginService.prototype.loginUser = function (id, password, callback) {
                    try {
                        this.firebaseRef.authWithPassword({
                            email: id,
                            password: password
                        }, this.authHandler.bind(this));
                    }
                    catch (e) {
                        console.log('Login Error: Please try again.');
                    }
                };
                LoginService.prototype.authHandler = function (error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                    }
                    else {
                        var link = ['EmpDashboard', { email: authData.password.email, gravatar: authData.password.profileImageURL }];
                        this._router.navigate(link);
                    }
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map