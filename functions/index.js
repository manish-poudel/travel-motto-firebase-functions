const {onCall} = require("firebase-functions/v2/https");
const location_notes_controller = require('./location_notes/controller');
const travel_points_controller = require('./traveler_points/travel_points/controller');
const travel_games_controller = require('./travel_games/controller');
const admin = require('firebase-admin');
const {onDocumentUpdated, onDocumentWritten, onDocumentCreated} = require('firebase-functions/v2/firestore');

admin.initializeApp();

exports.saveLocationNotes = onCall(location_notes_controller.onSaveLocationNotes);
exports.getLocationNotesWithInProximity = onCall(location_notes_controller.onGetLocationNotesWithInProximity);
exports.onTravelCompletion = onDocumentUpdated("travellers/{travelerId}/travels/{travelId}", travel_points_controller.onTravelCompletion)
exports.onTravelGamePlayerCreated = onDocumentCreated("travel_game_organisers/{organiserId}/games/{gameId}/players/{playerId}", travel_games_controller.onTravelGamePlayerCreated);
exports.onTravelGamePlayerUpdated = onDocumentUpdated("travel_game_organisers/{organiserId}/games/{gameId}/players/{playerId}", travel_games_controller.onTravelGamePlayerUpdated);