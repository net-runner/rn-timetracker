import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {StartButton} from './StartButton';

describe('StartButton', () => {
	it('should render the button with "play" icon', () => {
		const {getByTestId} = render(<StartButton isItemTracked={false} onPress={() => {}} />);
		const button = getByTestId('start-button');
		expect(button).not.toBeNull();
		expect(button.props.style[0].backgroundColor).toBe('#2278FF');
		expect(button.props.children.props.name).toBe('play');
	});

	it('should render the button with "pause" icon', () => {
		const {getByTestId} = render(<StartButton isItemTracked={true} onPress={() => {}} />);
		const button = getByTestId('start-button');
		expect(button).not.toBeNull();
		expect(button.props.style[0].backgroundColor).toBe('gray');
		expect(button.props.children.props.name).toBe('pause');
	});

	it('should call onPress when the button is pressed', () => {
		const mockOnPress = jest.fn();
		const {getByTestId} = render(<StartButton isItemTracked={false} onPress={mockOnPress} />);
		const button = getByTestId('start-button');
		fireEvent.press(button);
		expect(mockOnPress).toHaveBeenCalledTimes(1);
	});
});
