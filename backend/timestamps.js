'use strict'

const config = require('./config');
const fetch = require('node-fetch');
const firebaseUrl = config.FirebaseConfig.database_url;

const firebaseDB = require('./firebaseApp').database;

const LastUpdateRef = firebaseDB.ref('LastUpdate');

exports.last = function(type){
    type = type || 'Twitter'
    const url = `${firebaseUrl}LastUpdate/${type}.json`;
    return fetch(url)
        .then(res => res.json())
}

exports.update = function(type, value){
    type = type || 'Twitter'
    LastUpdateRef.child(type).set(value);
    return;
}



