
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

const {width , height} = Dimensions.get('window');

import DatePicker from 'react-native-datepicker'
import ScoreCard from './ScoreCard';
import moment from 'moment';

export default class ScoresBar extends Component {

  constructor(props){
    super(props);
    this.state = { date : new Date() }
  }

  dateChanged(date){
    this.setState({date : date})
  }

  render() {
    var scores = require('../mockData/scores');

    var _Component = <View><Text style={styles.noGamesText}>No games available</Text></View>
    if (scores){
      let PaddingView = <View style={styles.paddingView}/>
      var Scores = scores.map(score =>
        <ScoreCard
          hTeam={score.hTeam}
          aTeam={score.aTeam}
          hTeamScore={score.hTeamScore}
          aTeamScore={score.aTeamScore}
          status={score.status}
          navigator={this.props.navigator}
        />)
      _Component = <ScrollView horizontal={true}>{PaddingView}{Scores}</ScrollView>;
        }

    return (
      <View style={styles.scoreStrip}>

      <View style={{flexDirection : 'row', alignItems : 'center'}}>
        <Text style={{ color : 'orange', fontWeight: 'bold', fontSize : 20}}>Game</Text>
        <Text style={{ color : 'white', fontWeight: 'bold', fontSize : 20}}>Thread</Text>

        <TouchableHighlight style={styles.backBtn} onPress={() => this.props.navigator.pop()}>
          <Image style={{width : 10, height : 25, marginLeft : 30}} source={require('../assets/back-button.png')}/>
        </TouchableHighlight>

        <DatePicker
          date = {this.state.date}
          customStyles = {{ dateInput : {borderWidth : 0}, dateText: { color : 'white'}}}
          showIcon = {false}
          mode = 'date'
          placeholder = 'Select date'
          format = 'MM-DD-YYYY'
          confirmBtnText = 'Confirm'
          cancelBtnText = 'Cancel'
          onDateChange = {(date)=>{this.dateChanged(date)}}
          />
        </View>
        {_Component}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  scoreStrip : {
    width : width,
    padding : 5,
    paddingTop : 10,
    paddingBottom : 10,
    flex : 1,
    backgroundColor : 'black',
    justifyContent : 'center',
    alignItems : 'center'
  },
  noGamesText : {
    color : 'grey'
  },
  paddingView : {
    width : 20
  },
});
