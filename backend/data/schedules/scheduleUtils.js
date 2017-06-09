'use strict'
// copy an paste to app.js to run

const nbaGames = require('./data/schedules/nba-2016-ps.json').games,
    SportRadar = require('.../sportradar'),
    moment = require('moment');

nbaGames.map(SportRadar.utils.formatNBAGame)
    .forEach (function(game){
        setTimeout(function(){
            let date = moment(game.scheduled).format('YYYY-MM-DD').toString();
            // Games.child(date).child(game.id).set(game) < Games ref in db
            console.log(game);  
    }, 100)
});