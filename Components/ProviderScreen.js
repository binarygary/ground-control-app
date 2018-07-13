import React from 'react';
import {Button, FlatList, ActivityIndicator, Text, View, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import TimerCountdown from 'react-native-timer-countdown';

export class ProviderScreen extends React.Component {

	static navigationOptions = {
		title: 'Provider',
	};

	constructor( props ) {
		super( props );
		this.state = { isLoading: true }
	}

	componentDidMount() {
		let provider = 'https://launchlibrary.net/1.4/agency/' + this.props.navigation.state.params.id;
		return fetch( provider )
			.then( ( response ) => response.json() )
			.then( ( responseJson ) => {

				this.setState( {
					isLoading:  false,
					dataSource: responseJson.launches,
				}, function() {
					console.log(responseJson);
				} );

			} )
			.catch( ( error ) => {
				console.error( error );
			} );
	}

	render() {
		const { navigate } = this.props.navigation;
		if ( this.state.isLoading ) {
			return (
				<View style={{ flex: 1, padding: 20 }}>
					<ActivityIndicator/>
				</View>
			)
		}

		let ts = Math.round( (new Date()).getTime() );

		return (
			<View style={{ flex: 1, paddingTop: 20 }}>
				<FlatList
					data={this.state.dataSource}
					renderItem ='item'
					keyExtractor={( item, index ) => index.toString()}
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	launch:         {
		padding: 12,
	},
	stretch: {
		width: 100,
		height: 100
	},
	launchname:     {
		fontSize:   14,
		fontWeight: 'bold',
	},
	launchnamebr:     {
		paddingTop: 12,
		fontSize:   14,
		fontWeight: 'bold',
	},
	launchlocation: {
		color: '#f4511e',
	}
});