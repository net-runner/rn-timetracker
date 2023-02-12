import {Linking, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../AppStackProps';
import {Screen} from '../../Screens';
import {MainHeader} from '../MainHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text14, Text20, Text20Bold} from '../../Typography';
import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';

type Props = {} & NativeStackScreenProps<AppStackParamList, Screen.DETAILS>;

export const DetailsScreen = ({route, navigation}: Props) => {
	const launch = route.params.item;

	const articleLink = launch?.links?.article_link;
	const preskitLink = launch?.links?.presskit;
	const wikipedia = launch?.links?.wikipedia;

	const links = articleLink || preskitLink || wikipedia;

	const imagesLength = (launch!.links!.flickr_images && launch?.links?.flickr_images?.length) || 0;
	return (
		<>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				<MainHeader text={launch?.mission_name as string} />
				{!links && !launch?.details && (
					<MaxFillContainer>
						<Text20>No details available</Text20>
					</MaxFillContainer>
				)}

				{launch!.links!.flickr_images && imagesLength > 0 && (
					<StyledImage testID={'flickr-image'} source={{uri: launch!.links!.flickr_images[0] as string}} />
				)}
				<DetailsContainer>
					{launch?.details && (
						<>
							<StyledSectionText>Details</StyledSectionText>
							<Text14>{launch?.details}</Text14>
						</>
					)}

					{links && <StyledSectionText>Links</StyledSectionText>}
					{articleLink && (
						<Pressable onPress={() => Linking.openURL(launch?.links?.article_link as string)}>
							<Row>
								<StyledIcon name="link" color={'#f5f5f5'} />
								<Text14>Article</Text14>
							</Row>
						</Pressable>
					)}
					{preskitLink && (
						<Pressable onPress={() => Linking.openURL(launch?.links?.presskit as string)}>
							<Row>
								<StyledIcon name="link" color={'#f5f5f5'} />
								<Text14>Presskit</Text14>
							</Row>
						</Pressable>
					)}
					{wikipedia && (
						<Pressable onPress={() => Linking.openURL(launch?.links?.wikipedia as string)}>
							<Row>
								<StyledIcon name="link" color={'#f5f5f5'} />
								<Text14>Wikipedia</Text14>
							</Row>
						</Pressable>
					)}
				</DetailsContainer>
			</ScrollView>
			<FloatingButton testID={'backButton'} onPress={() => navigation.goBack()}>
				<Icon name="arrowleft" color={'#f5f5f5'} />
			</FloatingButton>
		</>
	);
};
const StyledSectionText = styled(Text20Bold)({
	marginTop: 20,
	marginBottom: 10,
});
const Row = styled.View({
	flexDirection: 'row',
	marginVertical: 8,
});
const DetailsContainer = styled.View({
	padding: 10,
});
const MaxFillContainer = styled.View({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
});
const StyledIcon = styled(Icon)({
	marginRight: 5,
	marginTop: 2,
});
const StyledImage = styled.Image({
	width: '100%',
	height: 300,
});
const FloatingButton = styled.TouchableOpacity({
	backgroundColor: DarkTheme.colors.primary,
	height: 40,
	width: 40,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
	marginLeft: 10,
	position: 'absolute',
	bottom: 50,
	left: 20,
});
