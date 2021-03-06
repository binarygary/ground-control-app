import React from 'react';
import {
	FlatList,
	ActivityIndicator,
	Text,
	View,
	StyleSheet,
} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';
import {LaunchName} from './LaunchComponents/Name.js';

export class HomeScreen extends React.Component {

	static navigationOptions = ( { navigation } ) => {
		return {
			title: 'Ground Control',
		}
	};

	constructor( props ) {
		super( props );
		this.state = { isLoading: true }
	}

	componentDidMount() {
		return fetch( 'https://launchlibrary.net/1.4/launch/next/50' )
			.then( ( response ) => response.json() )
			.then( ( responseJson ) => {

				this.setState( {
					isLoading:  false,
					dataSource: responseJson.launches.filter( item => item.netstamp > 0 ),
				}, function() {
				} );

			} )
			.catch( ( error ) => {
				console.error( error );
			} );
	}


	countdown( secondsRemaining ) {
		if ( secondsRemaining < 0 ) {
			return 'Not confirmed';
		}

		var milliseconds = parseInt( (secondsRemaining % 1000) / 100 ),
		    seconds      = parseInt( (secondsRemaining / 1000) % 60 ),
		    minutes      = parseInt( (secondsRemaining / (1000 * 60)) % 60 ),
		    hours        = parseInt( (secondsRemaining / (1000 * 60 * 60)) % 24 ),
		    days         = parseInt( (secondsRemaining / (1000 * 60 * 60 * 24 ) ) );

		days    = (days < 10 ) ? "0" + days : days;
		hours   = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return days + ":" + hours + ":" + minutes + ":" + seconds;
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
							<View style={styles.launch}>
								<Text style={styles.launchname} >
									<LaunchName name={item.name} launchid={item.id} nav={navigate}/>
								</Text>
								<Text style={styles.launchprovider}>
									{item.lsp.name}
								</Text>
								<Text style={styles.launchlocation}>{item.location.name}</Text>
								<TimerCountdown initialSecondsRemaining={( item.netstamp * 1000 - ts )}
								                formatSecondsRemaining={( secondsRemaining ) => this.countdown( secondsRemaining )}
								/>

							</View>
					}
					keyExtractor={( item, index ) => index.toString()}
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create( {
	container:      {
		flex: 1,
	},
	launch:         {
		padding: 12,
	},
	launchprovider: {
		fontSize: 13,
	},
	launchname:     {
		fontSize:   14,
		fontWeight: 'bold',
	},
	launchlocation: {
		color: '#f4511e',
	},
} );
