import React from 'react';
import { Text } from 'react-native';

export class ProviderName extends React.Component {

	render( props ) {
		if ( ! this.props.nav ) {
			return (
				<Text>{this.props.name}</Text>
			);
		}
		return (
			<Text onPress={() =>
				this.props.nav( 'Provider', { "id": this.props.providerid } )
			}>{this.props.name}</Text>
		);
	}

}