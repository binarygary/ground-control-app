import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './Components/HomeScreen';
import { SettingsScreen } from './Components/SettingsScreen';
import {LaunchScreen} from "./Components/LaunchScreen";

export default createStackNavigator({
	Home: { screen: HomeScreen, },
	Settings: { screen: SettingsScreen },
	Launch: { screen: LaunchScreen },
},{
	initialRouteName: 'Home',
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	},
});

