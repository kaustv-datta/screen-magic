System.register(['angular2/core', 'angular2/router', '../topics/topics.component', '../chat/chat.component', '../topics/topics.service'], function(exports_1, context_1) {
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
    var core_1, router_1, topics_component_1, chat_component_1, topics_service_1;
    var EmpDashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (topics_component_1_1) {
                topics_component_1 = topics_component_1_1;
            },
            function (chat_component_1_1) {
                chat_component_1 = chat_component_1_1;
            },
            function (topics_service_1_1) {
                topics_service_1 = topics_service_1_1;
            }],
        execute: function() {
            EmpDashboardComponent = (function () {
                function EmpDashboardComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                EmpDashboardComponent.prototype.ngOnInit = function () {
                    this.email = this._routeParams.get('email');
                    this.gravatar = this._routeParams.get('gravatar');
                };
                EmpDashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'emp-dashboard',
                        templateUrl: 'app/emp-dashboard/emp.dashboard.component.html',
                        directives: [topics_component_1.TopicsComponent, chat_component_1.ChatComponent],
                        providers: [topics_service_1.TopicsService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], EmpDashboardComponent);
                return EmpDashboardComponent;
            }());
            exports_1("EmpDashboardComponent", EmpDashboardComponent);
        }
    }
});
//# sourceMappingURL=emp.dashboard.component.js.map