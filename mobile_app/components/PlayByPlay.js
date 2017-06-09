import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
  View
} from 'react-native';
const {width , height} = Dimensions.get('window');

export default class PlayByPlay extends Component {
  constructor(props){
    super(props);
  }

  render() {

    var play = { team : 'MIA', clock : '11:49', text : 'Whiteside layup made (6 pts)' }
    var plays = [play, play, play, play, play, play, play, play, play, play, play, play, play, play];
    var Plays = plays.map(play =>
      <PlayRow text={play.text}
        team={play.team}
        clock={play.clock}
        />)

    return (
      <View style={styles.pbpContainer}>
        <View>
        </View>
        <ScrollView style={{height : height * (17/20)}}>
          {Plays}
        </ScrollView>
      </View>
    );
  }

}

class PlayRow extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={styles.playRow}>
        <Text style={styles.playRowClock}>{this.props.clock}</Text>
        <Text>{this.props.team}</Text>
        <Text style={styles.playText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pbpContainer : {
    width : width,
  },
  playRow : {
    flexDirection : 'row',
    padding : 15,
    borderBottomWidth : 1,
    backgroundColor : 'whitesmoke',
    borderBottomColor : 'silver'
  },
  playRowClock : {
    color : 'grey',
    marginRight : width/15
  },
  playText : {
    color : 'black',
    marginLeft : width/15
  }

});
