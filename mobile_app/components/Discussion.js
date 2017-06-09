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

var msg2 = {
    ref : 'msga',
    userName : 'Allen Iverson',
    userId : 'ffafgfd',
    text : 'My shot\'s better...',
    time : new Date(),
    isParent : false,
    parent : 'msga'
};

var msg = {
    ref : 'msga',
    userName : 'Joakim Noah',
    userId : 'ffafgdfggfd',
    text : 'Wow that was an unbelievable shot!',
    timestamp : new Date(),
    isParent : true,
    children : [msg2, msg2]
  };


var messages = [msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg, msg];
export default class Discussion extends Component {
  constructor(props){
    super(props);
  }

    render() {
      var Messages = messages.map(msg => <Comment userName={msg.userName} text={msg.text} time={msg.timestamp} children={msg.children}/>)
      return (
        <ScrollView>
          {Messages}
        </ScrollView>
      );
  }
}

class Comment extends Component {

  constructor(props){
    super(props)
  }

  render(){
    var ShowReplies = this.props.children.length > 0  ? <Text>{this.props.children.length} replies</Text> : null;
    return (
      <View style={styles.commentRow}>
        <Text>{this.props.userName}</Text>
        <Text>{this.props.time.toString()}</Text>
        {ShowReplies}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pbpContainer : {
    width : width,
  },
  commentRow : {
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
