import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './AppStackProps';
import {DetailsScreen} from './main/details/DetailsScreen';
import {MainScreen} from './main/MainScreen';
import {Screen} from './Screens';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name={Screen.MAIN} component={MainScreen} />
			<Stack.Screen name={Screen.DETAILS} component={DetailsScreen} />
		</Stack.Navigator>
	);
};
