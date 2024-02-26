/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');
const { payRequest } = require('./pay');
const { Client } = require('@googlemaps/google-maps-services-js');
const stripeClient = require('stripe')(process.env.STRIPEKEY);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
// Do SECRETES
// firebase functions:secrets:set STRIPEKEY
// ADD IT IN .env file
// https://firebase.google.com/docs/functions/config-env?gen=2nd&_gl=1*byhc2l*_up*MQ..*_ga*NjMxNTEyOTQzLjE3MDg2MTM1NzE.*_ga_CW55HF8NVT*MTcwODYxMzU3MC4xLjAuMTcwODYxMzU3MC4wLjAuMA..#params

const googleClient = new Client({});

exports.geocode = onRequest((request, response) => {
	geocodeRequest(request, response, googleClient);
});
exports.placesNearBy = onRequest((request, response) => {
	placesRequest(request, response, googleClient);
});
exports.pay = onRequest((request, response) => {
	payRequest(request, response, stripeClient);
});
