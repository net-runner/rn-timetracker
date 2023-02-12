import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import {Services} from '../services/Services';

export class RootStore {
	services: Services;

	constructor(services: Services) {
		makeAutoObservable(this);
		this.services = services;
	}
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
