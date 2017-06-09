'use strict'
const firebaseDB = require('./firebaseApp').database;
const config = require('./config');
const SportRadar = require('./sportradar');

const NBA = SportRadar.initializeNBA(config.SportRadarConfig.api_key);

const Games = firebaseDB.ref('Games');
const BoxScores = firebaseDB.ref('BoxScores');
const Plays = firebaseDB.ref('Plays');

/*BOX SCORE FORMAT        
    "two_points_pct": 1.0,
    "blocked_att": 0,
    "free_throws_made": 0,
    "free_throws_att": 0,
    "free_throws_pct": 0.0,
    "offensive_rebounds": 0,
    "defensive_rebounds": 2,
    "rebounds": 2,
    "assists": 0,
    "turnovers": 0,
    "steals": 0,
    "blocks": 0,
    "assists_turnover_ratio": 0,
    "personal_fouls": 3,
    "tech_fouls": 0,
    "flagrant_fouls": 0,
    "pls_min": 5,
    "points": 14
*/

exports.livePlayByPlay = function(dateStr, gameId) {
    
    console.log('Started live play by play');
    
    // first get all plays already stored
    var playsCache = {};
    
    // Update every 15 seconds by default
    const poll = setInterval(function(){
        
        console.log('Polling started');
        NBA.playByPlay(gameId)
            .then(function(data){
                handleData(data);
            })
        
    }, 1000 * 15);
    
    // stop after ~3 hours
    setTimeout(()=> {
        clearInterval(poll);
        console.log('Live play by play interval cleared');
        
    }, 1000 * 60 * 60 * 2.75); 

    
    function handleData(data){

        if (data.status == 'complete' 
            || data.status == 'closed'
            || data.status == 'cancelled'
            || data.status == 'postponed'){
                 Games.child(dateStr).child(gameId).update({
                    status : data.status
               })
                clearInterval(poll);
                console.log('Live play by play interval cleared');
        }
        
        Games.child(dateStr).child(gameId).update({
            hTeamScore : data.home.points,
            aTeamScore : data.away.points,
            clock : data.clock,
            status : data.status,
            quarter : data.quarter
        })
        
        console.log('handling data');
        console.log(data)
        
        data.periods.forEach(period => {
            period.events.forEach(event => handlePlay(event, period.number))
        })
    }
    
    function handlePlay(event, quarter){
        console.log('handling play');
        let play = {
            id : event.id,
            quarter : quarter,
            clock : event.clock,
            updated : event.updated,
            text : event.description,
            shotMade : (event.event_type == 'twopointmade' 
                || event.event_type == 'freethrowmade' 
                || event.event_type ==  'threepointmade'),
        }
        console.log(play)
        
        if (!(play.id in playsCache)){
            playsCache[play.id] = true;
            Plays.child(gameId).child(quarter.toString()).push(play);
            // console.log(play);
        }
    }

 }
 
 
exports.liveBoxScore = function(gameId){
    // must be responsible for shutting down self - must also update basic scores
        
    // first get all plays already stored
    var BoxScoreCache = {};
    
    // Update every 15 seconds by default
    const poll = setInterval(function(){
        NBA.boxScore(gameId)
            .then(handleData)
        
    }, 1000 * 20);
    
    // stop after ~3 hours
    setTimeout(()=> {
        clearInterval(poll);
        console.log('Live boxscore interval cleared');
        
    }, 1000 * 60 * 60 * 2.75); 

    
    function handleData(data){
        var homePlayerStats = data.home.players.map(player => ({
            name : player.full_name,
            played : player.played,
            stats : {
                minutes : player.statistics.minutes,
                fgm : player.statistics.field_goals_made,
                fga : player.statistics.field_goals_att,
                tpm : player.statistics.three_points_made,
                tpa : player.statistics.three_points_att,
                ftm : player.statistics.free_throws_made,
                fta : player.statistics.free_throws_att,
                orb : player.statistics.offensive_rebounds,
                rebounds : player.statistics.offensive_rebounds,
                assists : player.statistics.assists,
                steals : player.statistics.steals
                
            }
        }))
        
    console.log(homePlayerStats);
    BoxScores.child(gameId).push(homePlayerStats);
    }
}
        