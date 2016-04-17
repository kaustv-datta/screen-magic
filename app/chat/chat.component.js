System.register(['angular2/core', '../topics/topics.service'], function(exports_1, context_1) {
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
    var core_1, topics_service_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (topics_service_1_1) {
                topics_service_1 = topics_service_1_1;
            }],
        execute: function() {
            ChatComponent = (function () {
                function ChatComponent(topicsService) {
                    var _this = this;
                    this.messages = [];
                    this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
                    this.firebaseRef = new Firebase(this.firebaseUrl);
                    this.firebaseTopicsRef = this.firebaseRef.child('topics');
                    this.firebaseUsersRef = this.firebaseRef.child('users');
                    topicsService.topicChanged$.subscribe(function (topic) { return _this.onTopicChanged(topic); });
                }
                ChatComponent.prototype.ngOnInit = function () {
                    this.user = this.email.split('@')[0];
                };
                ChatComponent.prototype.onTopicChanged = function (topic) {
                    this.topic = topic;
                    this.messages.length = 0;
                    if (topic) {
                        this.firebaseTopicsRef.child(topic.key).child('messages').on('value', function (dataSnapshot) {
                            this.parseMessages(dataSnapshot.val());
                        }, function (err) { console.log(err); }, this);
                    }
                };
                ChatComponent.prototype.parseMessages = function (messageObj) {
                    this.messages.length = 0;
                    for (var msg in messageObj) {
                        this.messages.push(messageObj[msg]);
                    }
                };
                ChatComponent.prototype.sendMessage = function (inputDom) {
                    var message = inputDom.value;
                    if (message == '') {
                        return;
                    }
                    else {
                        if (this.topic && this.topic.key) {
                            this.firebaseTopicsRef.child(this.topic.key).child('messages').push({
                                user: this.user,
                                avatar: this.gravatar,
                                message: message
                            });
                        }
                        inputDom.value = '';
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ChatComponent.prototype, "gravatar", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ChatComponent.prototype, "email", void 0);
                ChatComponent = __decorate([
                    core_1.Component({
                        selector: 'my-chatbox',
                        templateUrl: 'app/chat/chat.component.html'
                    }), 
                    __metadata('design:paramtypes', [topics_service_1.TopicsService])
                ], ChatComponent);
                return ChatComponent;
            }());
            exports_1("ChatComponent", ChatComponent);
        }
    }
});
//# sourceMappingURL=chat.component.js.map