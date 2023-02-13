import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import {TrackedItemStore} from '../components/main/store/TrackedItemStore';
import {Services} from '../services/Services';

export class RootStore {
	services: Services;
	trackedItemStore: TrackedItemStore;

	constructor(services: Services) {
		this.services = services;
		this.trackedItemStore = new TrackedItemStore(this);
		makeAutoObservable(this);
	}

	async initApp() {
		await this.trackedItemStore.init();
	}
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
