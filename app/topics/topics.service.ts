import { Injectable, EventEmitter } from 'angular2/core';

import {Topic} from './topic';
import {Message} from './message';

@Injectable()
export class TopicsService {
	
	public topicChanged$: EventEmitter<Topic>;
	private currentTopic: Topic;

	constructor () {
        this.topicChanged$ = new EventEmitter();
	}

	changeTopic (topic: Topic) {
		this.currentTopic = topic;
		this.topicChanged$.emit(topic);
	}

	clearTopic () {
		delete this.currentTopic;
		this.topicChanged$.emit(this.currentTopic);
	}

}
 