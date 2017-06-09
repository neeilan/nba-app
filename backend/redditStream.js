'use strict'
var subreddit = "nba";
var url = "https://www.reddit.com/r/"+subreddit+"/new.json";
var fetch = require('node-fetch');
const Timestamps = require('./timestamps');

var firebaseDB = require('./firebaseApp').database;
var Posts = firebaseDB.ref('Posts');


var last_update = 0;

exports.pollReddit = pollReddit;

function pollReddit(){
  Timestamps.last('Reddit')
  .then(function (last_update){
    console.log(last_update)
    fetch(url)
    .then(function(response) {
      return response.json();
    })
  .then(function(raw) {
    var results = raw.data.children.filter(function(result){
      return (result.data.created_utc > last_update);
    });
    
    var condensed_results = results.map(function(result){
      return {
        'id' : result.data.id,
        'text' : result.data.title,
        'created_utc' : result.data.created_utc,
        'created_time' : new Date(result.data.created_utc * 1000),
        'domain' : result.data.domain,
        'url' : result.data.url.replace('http:', 'https:'),
        'user' : {
          name : 'Reddit'
        }
      };
      // id can be used as reddit.com/id
    })
    .filter(res => (res.domain != 'self.nba' && res.domain.indexOf('reddit') == -1))
    
    var last = condensed_results[0];
    if (last && last.created_utc > last_update){
      last_update = last.created_utc;
      Timestamps.update('Reddit', last.created_time.getTime()/1000)
    }
    
    for (var i in condensed_results){
      handle(condensed_results[i])
      .then(result => {
        setTimeout(function(){
          Posts.push(result);
        },50)
      })
    }
  });
  });
}

pollReddit();
const stream = setInterval(pollReddit, 1000 * 15);


function handle(result){
  return new Promise(function (resolve, reject){
  // find streamables
  if (result.domain.includes('streamable')){
    result.type = 'streamable';
    if (!result.url.includes('cdn.streamable'))
    {
      let vidId = result.url.substring(result.url.indexOf('.com') + 5);
      return resolve(fetch('https://api.streamable.com/videos/' + vidId)
        .then(res => res.json())
        .then(data => {
          result.photoUrl = 'https:' + data.thumbnail_url;
          result.videoUrl = 'https:' + data.files.mp4.url
          return result;
        }))
    }
    else {
      result.videoUrl = result.url;
    }
    
    console.log('STREAMABLE ' + result.url);
  }
  else if (result.domain.includes('youtu')){
    result.type = 'youtube';
    console.log('YOUTUBE ' + result.url);
  }
  else if (result.domain.includes('twitter')){
    console.log('TWITTER '+result.url);
  }
  return resolve(result);
  })
}


function unix_to_str(unix_timestamp){
  var date = new Date(unix_timestamp*1000);
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}