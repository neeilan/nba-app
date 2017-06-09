import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  Dimensions,
  View
} from 'react-native';
const {width , height} = Dimensions.get('window');


export default class TopBarGame extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style = {{width:width}}>
        <View style={styles.topBar}>
          <TouchableHighlight style={styles.backBtn} onPress={() => this.props.navigator.pop()}>
            <Image style={styles.backImg} source={require('../assets/back-button.png')}/>
          </TouchableHighlight>
          <View style={styles.topBarGameStatus}>
            <Text style={styles.statusText}>{this.props.status}</Text>
            <View style={styles.topBarScore}>
              <Text style={styles.backText}>{this.props.hTeam}</Text>
              <Text style={styles.backText}>{this.props.hTeamScore}</Text>
              <Text style={styles.backText}>|</Text>
              <Text style={styles.backText}>{this.props.aTeamScore}</Text>
              <Text style={styles.backText}>{this.props.aTeam}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    height : height * (1/10),
    backgroundColor : 'black',
  },
  backText : {
    color : 'grey',
    fontSize : 15,
    marginLeft : 10,
    marginRight : 10
  },
  statusText : {
    color : 'silver',
    fontSize : 13,
    margin : 4
  },
  topBarScore : {
    flexDirection : 'row'
  },
  topBarGameStatus : {
    alignItems : 'center'
  },
  backBtn : {
    position : 'absolute',
    left : width/15,
    top : height/30
  },
  backImg : {
    height : 20,
    width : 10
  },
});
