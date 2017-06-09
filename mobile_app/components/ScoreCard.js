
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  View
} from 'react-native';
import DatePicker from 'react-native-datepicker';
const {width , height} = Dimensions.get('window');


export default class ScoreCard extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <TouchableHighlight onPress={()=>this.props.navigator.push({ name : 'Game' })}>
        <View style={styles.card}>
          <View style={styles.upperPart}>
            <Text style={styles.status}>{this.props.status}</Text>
          </View>
          <View style = {styles.lowerPart}>
            <View style= {styles.leftSide}>
              <Text style={styles.text}>{this.props.hTeam}</Text>
              <Text style={styles.text}>{this.props.aTeam}</Text>
            </View>
            <View style = {styles.rightSide}>
              <Text style={styles.text}>{this.props.hTeamScore}</Text>
              <Text style={styles.text}>{this.props.aTeamScore}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  card : {
    width : 85,
    height : 63,
    margin : 5,
    padding : 5,
    borderWidth : 1,
    borderRadius : 10,
    borderColor : 'grey'
  },
  upperPart : {
    alignItems : 'center'
  },
  lowerPart : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
  },
  leftSide : {
    flex : 1,
    paddingLeft: 5,
  },
  rightSide : {
    flex : 1,
    alignItems : 'flex-end',
    marginRight : 3,
  },
  status : {
    fontSize : 10,
    color : 'orange',
    paddingBottom : 3
  },
  text : {
    color : 'silver'
  }
});
