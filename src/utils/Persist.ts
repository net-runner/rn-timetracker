import {makePersistable, PersistStoreMap, StorageController} from 'mobx-persist-store';
import {SerializableProperty} from 'mobx-persist-store/lib/esm2017/serializableProperty';

export const persist = <
	T extends {
		[key: string]: any;
	},
	P extends keyof T,
>(
	store: T,
	name: string,
	properties: (P | SerializableProperty<T, P>)[],
	storageController: StorageController,
	afterHydration?: () => void,
) => {
	const persistInStorage = () => {
		makePersistable(store, {
			name,
			properties,
			storage: storageController,
		}).then(_ => {
			afterHydration && afterHydration();
		});
	};
	const persistedStore = Array.from(PersistStoreMap.values()).find(el => el.storageName.includes(name));
	if (persistedStore) {
		persistedStore.stopPersisting();
	}
	persistInStorage();
};
