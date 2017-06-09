'use strict'
const firebase = require('firebase');
const config = require('./config');
const firebaseApp = firebase.initializeApp({
    serviceAccount : config.FirebaseServiceAccount, // admin access
    databaseURL: config.FirebaseConfig.database_url,
});

exports.database = firebaseApp.database(); //this doesnt have to be database only