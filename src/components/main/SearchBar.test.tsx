import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SearchBar} from './SearchBar';

describe('SearchBar', () => {
	test('renders correctly', () => {
		const {getByPlaceholderText} = render(<SearchBar value="" setValue={() => {}} placeholder="Search" />);
		const input = getByPlaceholderText('Search');
		expect(input).toBeTruthy();
	});

	test('clears input on clear button press', () => {
		const mockSetValue = jest.fn();
		const {getByTestId} = render(<SearchBar value="test" setValue={mockSetValue} />);
		const clearButton = getByTestId('clear-button');
		fireEvent.press(clearButton);
		expect(mockSetValue).toHaveBeenCalledWith('');
	});
});
