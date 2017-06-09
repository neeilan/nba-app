import firebaseApp from '../firebaseApp';
const firebaseDB = firebaseApp.database;
import React, { Component } from 'react';
import Post from './Post';

import {
  StyleSheet,
  ListView,
  Text,
  Dimensions,
  View
} from 'react-native';

const {width , height} = Dimensions.get('window');

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.postsRef = firebaseDB.ref('Posts');
    this.state = {
      league : null,
      posts : [],
      dataSource : new ListView.DataSource({
        rowHasChanged : (row1, row2) => row1.id != row2.id,
      })
    };
  }

  componentDidMount(){
    // this.loadInitialPosts(this.postsRef);
    this.listenForPosts(this.postsRef);
  }

  listenForPosts(postsRef){
    postsRef.orderByKey().limitToLast(12).on('child_added', (snap)=>{
      var post = snap.val();
      post.key = snap.key;
      var posts = [post].concat(this.state.posts);
      this.setState({
        posts : posts,
        dataSource : this.state.dataSource.cloneWithRows(posts)
      })
    })
  }

  loadOlderPosts(){
    if (this.state.posts.length <12) return;
    var existingKeys = this.state.posts.map(post => post.key).sort();


    let oldestRef = existingKeys[0] || '000' ;
    let secondOldestRef = existingKeys[1] || '000' ;
    alert(oldestRef + ',' + secondOldestRef)

    if (oldestRef === secondOldestRef && oldestRef !== '000') return;

    this.postsRef.orderByKey().endAt(oldestRef).limitToFirst(10).on('child_added', (snap)=>{
      var post = snap.val();
      post.key = snap.key;
      var posts = this.state.posts.concat([post]);
      console.log(post)
      this.setState({
        posts : posts,
        dataSource : this.state.dataSource.cloneWithRows(posts)
      })
    })


  }

  // componentDidMount(){
  //   this.listenForPosts(this.postsRef);
  //   // var mockPosts = require('../mockData/posts');
  //   // this.setState({
  //   //   dataSource : this.state.dataSource.cloneWithRows(mockPosts)
  //   // })
  // }

  renderPost(post){
    return <Post
      user={post.user}
      url={post.url}
      text={post.text}
      photoUrl={post.photoUrl}
      videoUrl={post.videoUrl}
      navigator={this.props.navigator} />
  }

  render() {
    var postsToRender;
    switch (this.state.league){
      case 'NBA':
        postsToRender = this.state.posts.filter(post => post.league === 'NBA');
        break;
      case 'NHL':
        postsToRender = this.state.posts.filter(post => post.league === 'NHL');
        break;
      case 'MLB':
        postsToRender = this.state.posts.filter(post => post.league === 'MLB');
        break;
      case 'NFL':
        postsToRender = this.state.posts.filter(post => post.league === 'MLB');
        break;
      case 'SOCCER':
        postsToRender = this.state.posts.filter(post => post.league === 'SOCCER');
        break;
      default:
        postsToRender = this.state.posts;
    }

    return (
        <ListView
          style = {{height : height * 7/10}}
          dataSource = {this.state.dataSource}
          renderRow={this.renderPost.bind(this)}
          enableEmptySections = {true}
          onEndReached = {this.loadOlderPosts.bind(this)}
           />
    );
  }
}

const styles = StyleSheet.create({

});
