import {action, makeAutoObservable} from 'mobx';
import moment from 'moment';
import {RootStore} from '../../../store/RootStore';
import {persist} from '../../../utils/Persist';
import {TrackedItem} from '../TrackedItem';

export class TrackedItemStore {
	rootStore: RootStore;
	isTracking: boolean = false;
	currentlyTrackedItem: TrackedItem | undefined = undefined;
	trackers: TrackedItem[] = [];
	trackerInterval: number | undefined;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {}, {autoBind: true});

		this.rootStore = rootStore;

		persist(
			this,
			'TrackedItemStore',
			['isTracking', 'currentlyTrackedItem', 'trackers'],
			rootStore.services.storage.storageController,
			this.init,
		);
	}
	public async init() {
		if (this.currentlyTrackedItem && this.isTracking) {
			const tracker = this.trackers.find(tracker => tracker.id === this.currentlyTrackedItem!.id);
			if (tracker) {
				tracker.intervalCounter = moment(new Date()).diff(tracker!.startedAt, 'seconds');

				this.trackerInterval = setInterval(
					action(() => {
						tracker.intervalCounter += 1;
					}),
					1000,
				);
				this.currentlyTrackedItem = tracker;
			}
		}
	}

	public createTrackedItem(name: string, priority: number) {
		this.trackers.push(new TrackedItem({name, createdAt: moment(new Date()).format(), priority}));
	}

	get totalTrackedTime(): number {
		return this.trackers.reduce((total, tracker) => total + tracker.elapsed, 0);
	}

	public cleanTrackedItems() {
		this.trackers = [];
		this.cleanTracking();
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

		const tracker = this.trackers.find(tracker => tracker.id === item.id);
		if (tracker) {
			const startDate = moment(new Date()).format();
			tracker.startedAt = startDate;
			this.trackerInterval = setInterval(
				action(() => {
					tracker.intervalCounter += 1;
				}),
				1000,
			);
		}

		this.currentlyTrackedItem = tracker;
	}

	public stopTracking(item: TrackedItem) {
		const tracker = this.trackers.find(tracker => tracker.id === item.id);
		if (tracker) {
			const startDate = moment(tracker.startedAt);
			tracker.elapsed += moment(new Date()).diff(startDate, 'seconds');
			tracker.startedAt = undefined;
			tracker.intervalCounter = 0;
		}

		this.cleanTracking();
	}

	public cleanTracking() {
		this.isTracking = false;
		this.currentlyTrackedItem = undefined;
		if (this.trackerInterval) {
			clearInterval(this.trackerInterval);
		}
	}
}
