import {makeAutoObservable} from 'mobx';
import moment from 'moment';
import {RootStore} from '../../../store/RootStore';
import {persist} from '../../../utils/Persist';
import {TrackedItem} from '../TrackedItem';

export class TrackedItemStore {
	rootStore: RootStore;
	isTracking: boolean = false;
	currentlyTrackedItem?: TrackedItem;
	trackers: TrackedItem[] = [];

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {}, {autoBind: true});

		this.rootStore = rootStore;

		persist(
			this,
			'TrackedItemStore',
			['isTracking', 'currentlyTrackedItem', 'trackers'],
			rootStore.services.storage.storageController,
		);
	}

	public createTrackedItem(name: string, priority: number) {
		this.trackers.push(new TrackedItem({name, createdAt: moment(new Date()).format(), priority}));
	}

	get totalTrackedTime(): number {
		return this.trackers.reduce((total, tracker) => total + tracker.elapsed, 0);
	}

	public cleanTrackedItems() {
		this.trackers = [];
	}

	public delateTrackedItem(id: string) {
		this.trackers = this.trackers.filter(tracker => tracker.id !== id);
	}

	public isItemTracked(id: string) {
		if (this.currentlyTrackedItem) {
			return this.currentlyTrackedItem.id === id;
		}
		return false;
	}

	public shouldShowButton(id: string) {
		return this.isItemTracked(id) || !this.isTracking;
	}

	public startTracking(item: TrackedItem) {
		this.isTracking = true;
		this.currentlyTrackedItem = item;
	}

	public stopTracking() {
		this.isTracking = false;
		this.currentlyTrackedItem = undefined;
	}
}
