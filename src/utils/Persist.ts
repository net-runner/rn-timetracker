import {makePersistable, PersistStoreMap, StorageController} from 'mobx-persist-store';

export const persist = <
	T extends {
		[key: string]: any;
	},
	P extends keyof T,
>(
	store: T,
	name: string,
	properties: P[],
	storageController: StorageController,
) => {
	const persistInStorage = () => {
		makePersistable(store, {
			name,
			properties,
			storage: storageController,
		});
	};
	const persistedStore = Array.from(PersistStoreMap.values()).find(el => el.storageName.includes(name));
	if (persistedStore) {
		persistedStore.stopPersisting();
	}
	persistInStorage();
};
