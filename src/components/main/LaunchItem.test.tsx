import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {LaunchItem} from './LaunchItem';
import {Launch} from '../Launch';

jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn().mockReturnValue({
		navigate: jest.fn(),
	}),
	DarkTheme: {
		colors: {
			text: '#fff',
		},
	},
}));

describe('LaunchItem', () => {
	let props: {item: Launch};

	beforeEach(() => {
		props = {
			item: {
				mission_name: 'Test Mission',
				launch_date_unix: 1615169200,
				rocket: {
					rocket_name: 'Test Rocket',
				},
			},
		};
	});

	it('renders correctly', () => {
		const {getByText} = render(<LaunchItem {...props} />);

		const testDate = new Date(props.item?.launch_date_unix * 1000);
		const dayMonthYear = testDate.getDay() + 1 + '/' + (testDate.getMonth() + 1) + '/' + testDate.getFullYear();

		expect(getByText('Test Mission')).toBeTruthy();
		expect(getByText('Test Rocket')).toBeTruthy();
		expect(getByText(dayMonthYear)).toBeTruthy();
		expect(getByText(testDate.toTimeString().split(' ')[0])).toBeTruthy();
	});

	it('navigates to details screen when pressed', async () => {
		const navigate = jest.fn();
		(useNavigation as jest.Mock).mockReturnValue({navigate});

		const {getByTestId} = render(<LaunchItem {...props} />);

		fireEvent.press(getByTestId('launchItem'));
		expect(navigate).toHaveBeenCalledWith('details', {item: props.item});
	});
});
