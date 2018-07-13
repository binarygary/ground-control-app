import React from 'react';
import {Button, FlatList, ActivityIndicator, Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import TimerCountdown from 'react-native-timer-countdown';

export class LaunchScreen extends React.Component {

	static navigationOptions = {
		title: 'Launch',
	};

	constructor( props ) {
		super( props );
		this.state = { isLoading: true };
	}

	componentDidMount() {
		let launch_id = 'https://launchlibrary.net/1.4/launch/' + this.props.navigation.state.params.id;
		return fetch( launch_id )
			.then( ( response ) => response.json() )
			.then( ( responseJson ) => {

				this.setState( {
					isLoading:  false,
					dataSource: responseJson.launches,
				}, function() {
				} );

			} )
			.catch( ( error ) => {
				console.error( error );
			} );
	}

	mission( item, context ) {
		if ( item.missions.isArray() && context == 'name' ) {
			return item.missions[0].name;
		}

	}

	renderItem( { item } ) {


		missionname = '';
		missiondescription = '';
		if ( Array.isArray(item.missions) && item.missions.length ) {
			missionname = item.missions[0].name;
			missiondescription = item.missions[0].description;
		}

		return ( <View style={styles.launch}>
			<Text style={styles.launchname}>{item.name}</Text>
			<Text style={styles.launchlocation}>{item.location.name}</Text>
			{date = new Date(item.net).toString()}
			<Text>{date}</Text>

			<Text style={styles.launchnamebr}>Provider: {item.lsp.name}</Text>

			<Text style={styles.launchnamebr}>Rocket: {item.rocket.name}</Text>
			<Image style={styles.stretch} source={{uri: item.rocket.imageURL}} />

			<Text style={styles.launchnamebr}>Mission: {missionname}</Text>
			<Text>{missiondescription}</Text>

			<Text style={styles.launchnamebr}>Location: {item.location.name}</Text>
			<Text>{item.location.pads[0].name}</Text>

		</View> );
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
					renderItem ={this.renderItem}
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