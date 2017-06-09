import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  Dimensions,
  View
} from 'react-native';

import { Video } from 'react-native-media-kit';
import moment from 'moment';
var he = require('he');
const {width , height} = Dimensions.get('window');

export default class Post extends Component {
  constructor(props){
    super(props);
  }

  viewPost(){
    if (this.props.url){
      this.props.navigator.push({name : 'Website', passProps : { url : this.props.url, text : this.props.text }})
    }
  }

  render() {
    var userImageSrc, VideoOrPhotoComponent = <View/>;
    if (this.props.user.name == 'Reddit'){
      userImageSrc = require('../assets/reddit-logo.png');
    }
    else {
      userImageSrc = {uri : this.props.user.image }
    }

    if (this.props.videoUrl){
      VideoOrPhotoComponent = <Video
        src={this.props.videoUrl}
        style={styles.postVideo}
        autoplay = {false}
        controls = {true}
        poster = {this.props.photoUrl}
      />
    }
    else if (this.props.photoUrl){
      VideoOrPhotoComponent = <Image style= {styles.postImage} source={{uri : this.props.photoUrl }}/>
    }
    const d = moment(this.props.time).format('MMM DD h:mm a')

    return (
      <TouchableHighlight onPress={this.viewPost.bind(this)}>
        <View style={styles.post}>
        <View style={styles.userRowContainer}>
          <View style = {styles.userRow}>
            <Image style= {styles.userImage} source={userImageSrc}/>
            <View>
              <Text style={styles.userName}> { this.props.user.name }</Text>
              <Text style={styles.time}>{d.toString()}</Text>
            </View>
          </View>
        </View>
              {VideoOrPhotoComponent}
              <Text style={styles.text}> { he.decode(this.props.text) } </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding : 5,
    borderColor : 'silver',
    borderBottomWidth: 1
  },
  text: {
    color: '#333333',
    margin : 15
  },
  postImage : {
    width: width,
    height : 200,
    resizeMode : 'cover',
    marginTop : 10,
  },
  postVideo : {
    width : width,
    height : width / (16/9),
    marginTop : 10,
  },
  userRowContainer : {
    flexDirection : 'row',
    marginTop : 10,
    marginLeft : 15
  },
  userRow : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'flex-start',
  },
  userImage : {
    width : 30,
    height : 30,
    borderRadius : 15,
    marginRight: 5
  },
  userName : {
    flex : 1,
    fontSize : 12
  },

  time : {
    flex : 1,
    color : 'grey',
    fontSize : 12
  }
});
