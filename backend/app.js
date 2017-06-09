'use strict'
const scheduler = require('./scheduler');
const firebaseDB = require('./firebaseApp').database;
const config = require('./config');
const moment = require('moment');

const SportRadar = require('./sportradar');
const NBA = SportRadar.initializeNBA(config.SportRadarConfig.api_key);

const Games = firebaseDB.ref('Games');
const Posts = firebaseDB.ref('Posts');
const BoxScores = firebaseDB.ref('BoxScores');
const Plays = firebaseDB.ref('Plays');

const twitterStream = require('./twitterStream');
const redditStream = require('./redditStream');

console.log('starting...')

scheduler.scheduleDay();
twitterStream.pollTwitterList();
redditStream.pollReddit();

