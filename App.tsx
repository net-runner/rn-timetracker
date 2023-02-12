import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './src/components/AppStack';

export const App = () => {
	return (
		<NavigationContainer theme={DarkTheme}>
			<AppStack />
		</NavigationContainer>
	);
};
