import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from './Button';

describe('Button component', () => {
	it('renders the title and triggers onPress when pressed', async () => {
		const onPress = jest.fn();
		const title = 'Test button';

		const {getByText} = render(<Button title={title} onPress={onPress} />);
		const button = getByText(title);

		fireEvent.press(button);

		expect(onPress).toHaveBeenCalled();
	});
});
