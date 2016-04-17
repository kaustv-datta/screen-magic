System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AdminDashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AdminDashboardComponent = (function () {
                function AdminDashboardComponent() {
                    this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
                    this.firebaseRef = new Firebase(this.firebaseUrl);
                    this.usersRef = this.firebaseRef.child('users');
                }
                AdminDashboardComponent.prototype.ngOnInit = function () {
                    var userValChange = this.usersRef.on('value', function (dataSnapshot) {
                        var users = dataSnapshot.val();
                        this.users = this.parseUsersData(users);
                    }, function (err) { console.log(err); }, this);
                };
                AdminDashboardComponent.prototype.parseUsersData = function (usersData) {
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
                };
                AdminDashboardComponent.prototype.changeAccess = function (user, hasAccess) {
                    //setTimeout( () => this.offendingAction(), 0)
                    try {
                        this.usersRef.child(user.name).child('hasAccess').set(hasAccess);
                    }
                    catch (e) {
                        console.log(e);
                    }
                };
                AdminDashboardComponent.prototype.goBack = function () {
                    window.history.back();
                };
                AdminDashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'admin-dashboard',
                        templateUrl: 'app/admin-dashboard/admin.dashboard.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdminDashboardComponent);
                return AdminDashboardComponent;
            }());
            exports_1("AdminDashboardComponent", AdminDashboardComponent);
        }
    }
});
//# sourceMappingURL=admin.dashboard.component.js.map