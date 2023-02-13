import 'react-native-get-random-values';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './src/components/AppStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStore, RootStoreProvider} from './src/store/RootStore';
import {MMKVStorageService} from './src/services/storage/MMKVStorageService';

const storage = new MMKVStorageService();

const rootStore = new RootStore({
	storage,
});

export const App = () => {
	return (
		<RootStoreProvider value={rootStore}>
			<SafeAreaProvider>
				<NavigationContainer theme={DarkTheme}>
					<AppStack />
				</NavigationContainer>
			</SafeAreaProvider>
		</RootStoreProvider>
	);
};
