import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './AppStackProps';
import {MainScreen} from './main/MainScreen';
import {Screen} from './Screens';
import {TrackedItemScreen} from './main/TrackedItemScreen';
import {TrackedItemCreateScreen} from './main/TrackedItemCreateScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Group>
				<Stack.Screen name={Screen.MAIN} component={MainScreen} />
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: 'transparentModal',
				}}>
				<Stack.Screen name={Screen.TASKINFO} component={TrackedItemScreen} />
				<Stack.Screen name={Screen.TASKCREATE} component={TrackedItemCreateScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
};
