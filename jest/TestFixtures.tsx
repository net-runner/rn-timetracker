import {render as rtlRender} from '@testing-library/react-native';
import {PersistStoreMap} from 'mobx-persist-store';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-gesture-handler/jestSetup';
import React, {FunctionComponentElement, PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MMKVStorageService} from '../src/services/storage/MMKVStorageService';
import {RootStore, RootStoreProvider} from '../src/store/RootStore';

const render = (ui: any, {rootStore = TestFixtures.createRootStore(), ...options} = {}) => {
	const Wrapper = ({children}: PropsWithChildren<any>): FunctionComponentElement<any> => (
		<RootStoreProvider value={rootStore}>
			<SafeAreaProvider
				initialMetrics={{
					// without initialMetrics SafeAreaProvider does not render any children
					insets: {bottom: 0, top: 0, left: 0, right: 0},
					frame: {x: 0, y: 0, width: 0, height: 0},
				}}>
				{children}
			</SafeAreaProvider>
		</RootStoreProvider>
	);

	return rtlRender(ui, {wrapper: Wrapper, ...options});
};

export * from '@testing-library/react-native';
// override React Testing Library's render with our own
export {render};
export class TestFixtures {
	static createRootStore(): RootStore {
		const storageService = new MMKVStorageService();
		return new RootStore({
			storage: storageService,
		});
	}

	static async flushPromises() {
		return new Promise(setImmediate);
	}

	static stopPersistAllStores() {
		Array.from(PersistStoreMap.values()).map(persistStore => persistStore.stopPersisting());
	}
}
