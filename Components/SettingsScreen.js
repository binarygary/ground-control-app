import React from 'react';
import {Button, FlatList, ActivityIndicator, Text, View} from 'react-native';

export class SettingsScreen extends React.Component {

	static navigationOptions = {
		title: 'Settings',
	};

	constructor( props ) {
		super( props );
		this.state = { isLoading: true }
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{ flex: 1, padding: 20 }}>
				<ActivityIndicator/>
			</View>
		);
	}

}