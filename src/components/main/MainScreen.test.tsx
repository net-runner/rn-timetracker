import React from 'react';
import {render} from '@testing-library/react-native';
import {MainScreen} from './MainScreen';
import {useQuery} from '@apollo/client';

jest.mock('@apollo/client', () => ({
	useQuery: jest.fn(),
}));
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

describe('MainScreen component', () => {
	it('should render the component correctly with loading state', () => {
		(useQuery as jest.Mock).mockReturnValue({loading: true});

		const {queryByText} = render(<MainScreen />);

		expect(queryByText('Loading...')).toBeTruthy();
	});

	it('should render the component correctly with error state', () => {
		(useQuery as jest.Mock).mockReturnValue({error: true, refetch: jest.fn()});

		const {queryByText} = render(<MainScreen />);

		expect(queryByText('Something went wrong')).toBeTruthy();
	});
});
