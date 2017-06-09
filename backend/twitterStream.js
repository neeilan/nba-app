'use strict'
var Twitter = require('twitter'),
    bigInt = require('big-integer'),
    Timestamps = require('./timestamps'),
    twitterConfig = require('./config').TwitterConfig;
    
const client = new Twitter(TwitterConfig);

var firebaseDB = require('./firebaseApp').database;
var Posts = firebaseDB.ref('Posts');

var reqListParams = {
  owner_screen_name : 'GT56641252',
  slug : 'nba',
  include_rts : false,
  since_id : '1'
}

exports.pollTwitterList = pollTwitterList;

function pollTwitterList(){
    Timestamps.last('Twitter')
        .then(val => { reqListParams.since_id = val || 1 })
        .then( nl => twitterRequest('lists/statuses', reqListParams))
        .then(function(tweets) {
            let last_id = reqListParams.since_id || -1 ;
            let new_since_id = tweets.map(t => bigInt(t.id_str))
                                    .reduce(function(max, cur){
                                        return max.compare(cur) > 0 ? max : cur;
                                    }, bigInt(last_id))
                                    .toString();
    console.log(new_since_id.toString())
    Timestamps.update('Twitter', new_since_id.toString())
            
        return tweets.map((tweet)=>({
            id : tweet.id_str,
            text : tweet.text,
            created_utc : tweet.created_at,
            url : tweet.entities.urls[0] ? tweet.entities.urls[0].url : null,
            media : tweet.entities.media,
            user : {
            name : tweet.user.name,
            image : tweet.user.profile_image_url_https,
            }
        }))
        .filter(tweet=>{
            if (tweet.media) {
                retrieveTweetMedia(tweet); // handle tweets with media separately
                return false;
            }
            else {
                delete tweet.media;
                return true;
            }
        })
        .forEach((tweet) => setTimeout(()=>Posts.push(tweet), 50))
        
        })
        .catch(e => console.log(e))
}


function twitterRequest(url, params){
    console.log('Since id: ', params.since_id);
    return new Promise(function(resolve,reject){
         client.get(url, params,function(err,data){
             if(err) return reject(err);
             resolve(data);
         });
    });
}

function retrieveTweetMedia(tweet){
    twitterRequest(`/statuses/show/${tweet.id}`, { include_entities : true })
    .then((mediaTweet)=>{
        tweet.media = mediaTweet.extended_entities.media[0];
        if (tweet.media.type == 'video' || tweet.media.type == 'animated_gif'){
            let videoUrl = tweet.media.video_info.variants.filter(v => v.url.indexOf('mp4') > -1)
                .reduce( (curr, max) => curr.bitrate > max.bitrate ? curr : max , { bitrate : 0 })
            tweet.videoUrl = videoUrl.url.replace('http:', 'https:');
        }
        // else if (tweet.media.type == 'photo') {
            tweet.photoUrl = tweet.media.media_url.replace('http:', 'https:');
        // }
        tweet.type = tweet.media.type;
        delete tweet.media;
        return tweet;
    })
    .then(tweet => setTimeout(()=>Posts.push(tweet), 50))
    .catch(e=>console.log('error 2 ' + e))
}

// Poll every 30 seconds
pollTwitterList();
setInterval(pollTwitterList, 1000 * 30);
