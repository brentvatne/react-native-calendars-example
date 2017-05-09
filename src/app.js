import React from 'react';
import Expo from 'expo';
import { Platform, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Agenda from './screens/agenda';
import Calendars from './screens/calendars';
import CalendarsList from './screens/calendarsList';
import Menu from './screens/menu';

const RootStack = StackNavigator({
  Menu: { screen: Menu },
  Agenda: { screen: Agenda },
  Calendars: { screen: Calendars },
  CalendarsList: { screen: CalendarsList },
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#00adf5',
    },
  }
});

export default class App extends React.Component {
  state = {
    ready: false,
  }

  async componentWillMount() {
    try {
      await Expo.Asset.fromModule(require('react-navigation/src/views/assets/back-icon.png')).downloadAsync();
    } catch(e) {
      alert(e.message);
      // ..
    } finally {
      this.setState({ready: true});
    }
  }

  render() {
    if (!this.state.ready) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={{flex: 1}}>
        { Platform.OS === 'android' && (
          <View style={{height: Expo.Constants.statusBarHeight, backgroundColor: '#00adf5'}} />
        )}
        <RootStack />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
