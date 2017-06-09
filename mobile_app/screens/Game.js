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

import Post from '../components/Post';
import BoxScore from '../components/Boxscore';
import Discussion from '../components/Discussion';
import PlayByPlay from '../components/PlayByPlay';
import TopBarGame from '../components/TopBarGame';

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      page : 'plays',
      hTeam : 'NYK',
      aTeam : 'MIA',
      hTeamScore : 55,
      aTeamScore : 79,
      status : '2:56 3Q'
    }
    this.tabPressed = this.tabPressed.bind(this)
  }

  componentWillMount(){
    // alert('componentWillMount');
  }
  tabPressed(tab){
    this.setState({page : tab })
  }



  render() {

    var BoxScoreView = this.state.page == 'box' ? (
      <ScrollView style={styles.contentScrollView}>
        <BoxScore />
        <BoxScore />
      </ScrollView>
    ) : (null);
    var PlayByPlayView = this.state.page == 'plays' ? (<PlayByPlay/>) : (null);
    var DiscussView = this.state.page == 'discuss' ? (<Discussion />) : (null);

    var tabStyles = {};
    tabStyles[this.state.page] = styles.selectedTabText;


    return (
      <View>
        <TopBarGame hTeam={this.state.hTeam}
          aTeam= {this.state.aTeam}
          hTeamScore = {this.state.hTeamScore}
          aTeamScore = {this.state.aTeamScore}
          status = {this.state.status}
          navigator = {this.props.navigator}
        />

        <View style={styles.tabView}>
          <Text style={tabStyles['plays'] || styles.tabText} onPress={e => this.tabPressed('plays')} name='plays'>Plays</Text>
          <Text style={tabStyles['box'] || styles.tabText} onPress={e => this.tabPressed('box')} name='box'>Box Score</Text>
          <Text style={tabStyles['discuss'] || styles.tabText} onPress={e => this.tabPressed('discuss')} name ='discuss'>Discuss</Text>
        </View>

        {BoxScoreView}
        {PlayByPlayView}
        {DiscussView}

      </View>
    );
  }

}



const styles = StyleSheet.create({
  boxScoreView : {

  },
  backText : {
    color : 'grey',
    fontSize : 15,
    marginLeft : 25
  },
  gameMenu : {
    flexDirection : 'row',
    backgroundColor : 'silver'
  },
  contentScrollView : {
    backgroundColor : 'whitesmoke',
    height : height * (17/20)
  },
  tabView : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    backgroundColor : 'orange',
    height : (height)/20,
    width : width
  },
  selectedTabText : {
    color : 'white',
    fontWeight : 'bold'
  },
  tabText : {
    color : 'chocolate',
    fontWeight : 'bold'
  }
});
