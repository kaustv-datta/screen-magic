import { Component, Input, OnInit } from 'angular2/core';

import { Topic } from '../topics/topic';
import { Message } from '../topics/message';
import { TopicsService } from '../topics/topics.service';

@Component({
    selector: 'my-chatbox',
    templateUrl: 'app/chat/chat.component.html'
})

export class ChatComponent implements OnInit {
	@Input() gravatar: string;
	@Input() email: string;

	firebaseUrl: string;
	firebaseRef: Firebase;
	firebaseTopicsRef: Firebase;
	firebaseUsersRef: Firebase;
	topic: Topic;
	messages: Message[] = [];
	user: string;

	constructor(topicsService: TopicsService) {
		this.firebaseUrl = "https://radiant-inferno-7607.firebaseio.com/";
		this.firebaseRef = new Firebase(this.firebaseUrl);
		this.firebaseTopicsRef = this.firebaseRef.child('topics');
		this.firebaseUsersRef = this.firebaseRef.child('users');

		topicsService.topicChanged$.subscribe(topic => this.onTopicChanged(topic));
	}

	ngOnInit() {
		this.user = this.email.split('@')[0];
	}

	onTopicChanged(topic) {
		this.topic = topic;
		this.messages.length = 0;

		if (topic) {
			this.firebaseTopicsRef.child(topic.key).child('messages').on('value', function (dataSnapshot) {
				this.parseMessages(dataSnapshot.val());
			},function (err) {console.log(err);}, this);
		}
		
	}

	parseMessages (messageObj) {
		this.messages.length = 0;
		for (var msg in messageObj) {
			this.messages.push(messageObj[msg]);
		}
	}

	sendMessage (inputDom) {
		var message = inputDom.value;

		if (message == '') {
			return;
		} else {
			if (this.topic && this.topic.key) {
				this.firebaseTopicsRef.child(this.topic.key).child('messages').push({
					user: this.user,
					avatar: this.gravatar,
					message: message
				});
			}
			inputDom.value = '';
		}
	}

}
