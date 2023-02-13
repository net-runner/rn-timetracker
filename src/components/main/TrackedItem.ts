import {makeAutoObservable} from 'mobx';
import {nanoid} from 'nanoid';

type OmitedValues = 'startedAt' | 'elapsed' | 'id' | 'intervalCounter';

export class TrackedItem {
	id: string = nanoid();
	name: string;
	createdAt: string;
	startedAt?: string;
	elapsed: number = 0;
	priority: number = 0;
	intervalCounter: number = 0;

	constructor(item: Omit<TrackedItem, OmitedValues>) {
		this.name = item.name;
		this.createdAt = item.createdAt;
		this.priority = item.priority;
		makeAutoObservable(this);
	}
}
