import {StorageController} from 'mobx-persist-store';
import {MMKV} from 'react-native-mmkv';
import {StorageService} from './StorageService';

export class MMKVStorageService implements StorageService {
	private readonly storage: MMKV = new MMKV();
	public storageController: StorageController;

	constructor() {
		this.storageController = {
			setItem: (key, data) => this.storage.set(key, data),
			getItem: key => this.storage.getString(key) as string | null,
			removeItem: key => this.storage.delete(key),
		};

		if (__DEV__) {
			const {initializeMMKVFlipper} = require('react-native-mmkv-flipper-plugin');
			initializeMMKVFlipper({default: this.storage});
		}
	}
}
