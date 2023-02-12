import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Linking} from 'react-native';
import {DetailsScreen} from './DetailsScreen';

describe('DetailsScreen', () => {
	const mockRoute = {
		params: {
			item: {
				mission_name: 'Test Mission',
				details: 'Test details',
				links: {
					article_link: 'https://article.com',
					flickr_images: ['https://flickr.com/image1.jpg'],
				},
			},
		},
	};

	const mockNavigation = {
		goBack: jest.fn(),
	};

	it('should render without crashing', () => {
		const {getByTestId} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		expect(getByTestId('header')).toBeTruthy();
	});

	it('should display the mission name in the header', () => {
		const {getByText} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		expect(getByText('Test Mission')).toBeTruthy();
	});

	it('should display the details when they are available', () => {
		const {getByText} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		expect(getByText('Details')).toBeTruthy();
		expect(getByText('Test details')).toBeTruthy();
	});

	it('should display the article link when it is available', () => {
		const {getByText} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		expect(getByText('Links')).toBeTruthy();
		expect(getByText('Article')).toBeTruthy();
	});

	it('should open the article link when it is pressed', () => {
		const {getByText} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		fireEvent.press(getByText('Article'));

		expect(Linking.openURL).toHaveBeenCalledWith('https://article.com');
	});

	it('should display the flickr image when it is available', () => {
		const {getByTestId} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		expect(getByTestId('flickr-image')).toBeTruthy();
	});

	it('should go back to the previous screen when the back button is pressed', () => {
		const {getByTestId} = render(<DetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />);

		fireEvent.press(getByTestId('backButton'));

		expect(mockNavigation.goBack).toHaveBeenCalled();
	});
});
