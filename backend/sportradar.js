'use strict'
const fetch = require('node-fetch'),
    moment = require('moment'),
    base_url = 'http://api.sportradar.us/';
    
exports.initializeNBA =  function (key) {
    const url_key = '?api_key=' + key;
    return {
        games : function(date_str){
            let d = date_str ? moment(date_str) : moment(); 
            const url = base_url + `nba-t3/games/${d.format('YYYY/MM/DD').toString()}/schedule.json${url_key}`;
            return fetchJSON(url).then(data => data.games)
        },
        
        boxScore : function(game_id){
            const url = base_url + `nba-t3/games/${game_id}/summary.json${url_key}`;
            return fetchJSON(url);
        },
        
        playByPlay : function(game_id){
            const url = base_url + `nba-t3/games/${game_id}/pbp.json${url_key}`;
            return fetchJSON(url);    
        }
    }
}

exports.utils = {
    formatNBAGame : function(game){
        return ({
            id : game.id,
            status : game.status,
            scheduled : game.scheduled,
            hTeam : game.home.alias,
            aTeam : game.away.alias
        })
    }
}

// Private utility functions
function fetchJSON(_url){
    return fetch(_url).then(data => data.json());
}
