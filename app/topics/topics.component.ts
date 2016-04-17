import { Component, Input, OnInit } from 'angular2/core';

import { Topic } from './topic';
import { TopicsService } from '../topics/topics.service';

@Component({
    selector: 'my-topics',
    templateUrl: 'app/topics/topics.component.html'
})

export class TopicsComponent implements OnInit {
	@Input() email: string;

	firebaseUrl: string;
	firebaseRef: Firebase;
	firebaseTopicsRef: Firebase;
	firebaseUsersRef: Firebase;
	topics: Topic[] = [];
	selectedTopic: Topic;
	user: string;
	subscriptionList: any;

	constructor(private _topicsService: TopicsService) {
		this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
		this.firebaseRef = new Firebase(this.firebaseUrl);
		this.firebaseTopicsRef = this.firebaseRef.child('topics');
		this.firebaseUsersRef = this.firebaseRef.child('users');
	}

	ngOnInit() {
		this.user = this.email.split('@')[0];

		this.firebaseTopicsRef.orderByKey().on('value', function (dataSnapshot) {
			this.topics = this.parseTopics(dataSnapshot.val());
			this.syncSubscriptions(this.subscriptionList);
		},function (err) {console.log(err);}, this);

	    this.firebaseUsersRef.child(this.user).child('topics').on('value', function (dataSnapshot) {
	    	this.syncSubscriptions(dataSnapshot.val());
		},function (err) {console.log(err);}, this);
	}

	addTopic (input) {
		var newTopic = input.value;

		var topicPushRef = this.firebaseTopicsRef.push({
			name: newTopic,
			createdBy: this.email,
			messages: {}
		});

		var uniqueKey = topicPushRef.key();

		this.firebaseUsersRef.child(this.user).child('topics').child(uniqueKey).set(true);

		input.value = '';
	}

	parseTopics (firebaseDataObj) {
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
	}

	activateTopic (topic) {
		if (topic.subscribed) {
			this.deactivateAllTopics();
			topic.active = true;
			this.selectedTopic = topic;
			this._topicsService.changeTopic(topic);
		} else {
			//alertify.error('Please subscribe.');
		}
	}

	deactivateAllTopics () {

		for (var count = 0; count < this.topics.length; count++) {
			this.topics[count].active = false;
		}

	}

	toggleSubscription (topic) {
		topic.subscribed = !topic.subscribed;

		if (!topic.subscribed) {
			topic.active = false;
			delete this.selectedTopic;
			this.firebaseUsersRef.child(this.user).child('topics').child(topic.key).set(false);
			this._topicsService.clearTopic();
		} else {
			this.firebaseUsersRef.child(this.user).child('topics').child(topic.key).set(true);
		}
	}

	syncSubscriptions (dataObj) {
		for (var key in dataObj) {
			var topic = this.findTopicWithKey(key);

			if (topic) {
				topic.subscribed = dataObj[key];
			}
		}

		this.subscriptionList = dataObj;
	}

	findTopicWithKey (key) {
		for (var count = 0; count < this.topics.length; count++) {
			if (this.topics[count].key === key) {
				return this.topics[count];
			}
		}
	}

}
