import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Indicator} from './Indicator';
import styled from '@emotion/native';

type Props = {
	priority: number;
	input?: boolean;
	onChange?: (value: number) => void;
};

const PRIORITIES = [1, 2, 3, 4, 5];

export const PriorityIndicator = ({priority, input = false, onChange = () => null}: Props) => {
	return (
		<Row>
			{PRIORITIES.map(value => (
				<TouchableOpacity disabled={!input} key={value} onPress={() => onChange(value)}>
					<Indicator active={value <= priority} />
				</TouchableOpacity>
			))}
		</Row>
	);
};
const Row = styled.View({
	flexDirection: 'row',
	marginTop: 5,
});
