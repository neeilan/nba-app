import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import Home from './screens/Home';
import Website from './screens/Website';
import Game from './screens/Game';

const ROUTES = {
  Home : Home,
  Website : Website,
  Game : Game,
};

export default class gamethread extends Component {

  constructor(props){
    super(props);
  }

  renderScene(route, navigator){
    var _Component = ROUTES[route.name];
    return <_Component route={route} navigator={navigator} {...route.passProps} />
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="orange"
        barStyle="light-content"
      />
      <View style={{backgroundColor : 'black', height : 12 }}/>
      <Navigator
        style={{}}
        initialRoute={{name: 'Home'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.PushFromRight; }}
        />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex : 1,
  }
});

AppRegistry.registerComponent('gamethread', () => gamethread);
