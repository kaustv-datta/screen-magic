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
    var TopicsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (topics_service_1_1) {
                topics_service_1 = topics_service_1_1;
            }],
        execute: function() {
            TopicsComponent = (function () {
                function TopicsComponent(_topicsService) {
                    this._topicsService = _topicsService;
                    this.topics = [];
                    this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
                    this.firebaseRef = new Firebase(this.firebaseUrl);
                    this.firebaseTopicsRef = this.firebaseRef.child('topics');
                    this.firebaseUsersRef = this.firebaseRef.child('users');
                }
                TopicsComponent.prototype.ngOnInit = function () {
                    this.user = this.email.split('@')[0];
                    this.firebaseTopicsRef.orderByKey().on('value', function (dataSnapshot) {
                        this.topics = this.parseTopics(dataSnapshot.val());
                        this.syncSubscriptions(this.subscriptionList);
                    }, function (err) { console.log(err); }, this);
                    this.firebaseUsersRef.child(this.user).child('topics').on('value', function (dataSnapshot) {
                        this.syncSubscriptions(dataSnapshot.val());
                    }, function (err) { console.log(err); }, this);
                };
                TopicsComponent.prototype.addTopic = function (input) {
                    var newTopic = input.value;
                    var topicPushRef = this.firebaseTopicsRef.push({
                        name: newTopic,
                        createdBy: this.email,
                        messages: {}
                    });
                    var uniqueKey = topicPushRef.key();
                    this.firebaseUsersRef.child(this.user).child('topics').child(uniqueKey).set(true);
                    input.value = '';
                };
                TopicsComponent.prototype.parseTopics = function (firebaseDataObj) {
                    var topics = [];
                    for (var topic in firebaseDataObj) {
                        topics.push({
                            name: firebaseDataObj[topic].name,
                            key: topic,
                            active: false,
                            subscribed: false
                        });
                    }
                    return topics;
                };
                TopicsComponent.prototype.activateTopic = function (topic) {
                    if (topic.subscribed) {
                        this.deactivateAllTopics();
                        topic.active = true;
                        this.selectedTopic = topic;
                        this._topicsService.changeTopic(topic);
                    }
                    else {
                    }
                };
                TopicsComponent.prototype.deactivateAllTopics = function () {
                    for (var count = 0; count < this.topics.length; count++) {
                        this.topics[count].active = false;
                    }
                };
                TopicsComponent.prototype.toggleSubscription = function (topic) {
                    topic.subscribed = !topic.subscribed;
                    if (!topic.subscribed) {
                        topic.active = false;
                        delete this.selectedTopic;
                        this.firebaseUsersRef.child(this.user).child('topics').child(topic.key).set(false);
                        this._topicsService.clearTopic();
                    }
                    else {
                        this.firebaseUsersRef.child(this.user).child('topics').child(topic.key).set(true);
                    }
                };
                TopicsComponent.prototype.syncSubscriptions = function (dataObj) {
                    for (var key in dataObj) {
                        var topic = this.findTopicWithKey(key);
                        if (topic) {
                            topic.subscribed = dataObj[key];
                        }
                    }
                    this.subscriptionList = dataObj;
                };
                TopicsComponent.prototype.findTopicWithKey = function (key) {
                    for (var count = 0; count < this.topics.length; count++) {
                        if (this.topics[count].key === key) {
                            return this.topics[count];
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TopicsComponent.prototype, "email", void 0);
                TopicsComponent = __decorate([
                    core_1.Component({
                        selector: 'my-topics',
                        templateUrl: 'app/topics/topics.component.html'
                    }), 
                    __metadata('design:paramtypes', [topics_service_1.TopicsService])
                ], TopicsComponent);
                return TopicsComponent;
            }());
            exports_1("TopicsComponent", TopicsComponent);
        }
    }
});
//# sourceMappingURL=topics.component.js.map