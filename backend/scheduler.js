'use strict'

const firebaseDB = require('./firebaseApp').database;
var schedule = require('node-schedule');
const config = require('./config');
const moment = require('moment');
const gameUpdates = require('./gameUpdates.js');
const Games = firebaseDB.ref('Games');
const Plays = firebaseDB.ref('Plays');


exports.scheduleDay = function (){
    // UTC format some games to fall to next day, we need to account for this
    const today = moment();
    const todayStr = today.format('YYYY-MM-DD').toString();

    Games.child(todayStr)    
        .once('value')    
        .then(function(snap){ 
            if (!snap) return;
            let games = snap.val();
            let keys = Object.keys(games);
            keys.forEach(function(key){
                let game = games[key];
                if (game.status == 'closed') return; // yesterday's game

                let tempDate = new Date(game.scheduled);
                let date = new Date(tempDate.getTime() + 0.5 * 60000); // start updates ~7 minutes after scheduled start, plus some time for scheduling
                schedule.scheduleJob(date, function(){
                    gameUpdates.liveBoxScore(game.id);
                    gameUpdates.livePlayByPlay(todayStr, game.id);
                });
                console.log('Game scheduled for :' + date);
            })
        })
}