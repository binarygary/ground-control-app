import React from 'react';
import { Text } from 'react-native';

export class LaunchName extends React.Component {

	render( props ) {
		if ( ! this.props.nav ) {
			return (
				<Text>{this.props.name}</Text>
			);
		}
		return (
			<Text onPress={() =>
				this.props.nav( 'Launch', { "id": this.props.launchid } )
			}>{this.props.name}</Text>
		);
	}

}