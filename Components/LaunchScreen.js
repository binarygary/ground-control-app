import React from 'react';
import {Button, FlatList, ActivityIndicator, Text, View, Image, StyleSheet} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';

export class LaunchScreen extends React.Component {

	static navigationOptions = {
		title: 'Launch',
	};

	constructor( props ) {
		super( props );
		this.state = { isLoading: true }
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
					renderItem={( { item } ) =>
						<View>
							<Text>{item.name}</Text>
							<Text>{item.location.name}</Text>
							<Text>{item.rocket.name}</Text>
							<Image style={styles.stretch} source={{uri: item.rocket.imageURL}} />
						</View>
					}
					keyExtractor={( item, index ) => index.toString()}
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	stretch: {
		width: 100,
		height: 100
	}
});