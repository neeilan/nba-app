import React, { Component } from 'react';
import { WebView, View, Text, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
const {width , height} = Dimensions.get('window');

export default class Website extends Component {
  render() {
    return (
      <View>
        <View style={styles.topBar}>
        <TouchableHighlight style={styles.backBtn} onPress={() => this.props.navigator.pop()}>
          <Image style={styles.backImg} source={require('../assets/back-button.png')}/>
        </TouchableHighlight>
          <Text style={styles.title}>{this.props.text.length > 30 ? this.props.text.substring(0, 30)+'...' : this.props.text}</Text>
        </View>

        <WebView
          source={{uri: this.props.url }}
          style={{height : height * (9/10), width: width }}
          mediaPlaybackRequiresUserAction = {false}
        />

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
  title : {
    marginLeft : 25,
    fontSize : 15,
    color : 'white'
  },
  backText : {
    color : 'grey',
    fontSize : 15,
    marginLeft : 25
  },
  backBtn : {
    position : 'absolute',
    left : width/15,
    top : height/30
  },
  backImg : {
    height : 20,
    width : 10
  }
})
