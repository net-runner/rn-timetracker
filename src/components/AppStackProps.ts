import {Screen} from './Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TrackedItem} from './main/TrackedItem';

export type AppStackParamList = {
	[Screen.MAIN]: undefined;
	[Screen.TASKINFO]: {item: TrackedItem};
	[Screen.TASKCREATE]: undefined;
};

export type AppStackProps = NativeStackNavigationProp<AppStackParamList>;
