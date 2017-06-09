import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';
const {width , height} = Dimensions.get('window');
import Post from '../components/Post';
import ScoresBar from '../components/ScoresBar';
import Feed from '../components/Feed';

export default class Home extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <View>
        <ScoresBar navigator={this.props.navigator}/>
        <View>
            <Feed style={styles.feed} navigator = {this.props.navigator}/>
        </View>
      </View>
    );
  }

}



const styles = StyleSheet.create({
  topBar : {
    height : height * (1/10),
    backgroundColor : 'grey',
  },
  feed : {
    height : height * (7/10),
  }
});
