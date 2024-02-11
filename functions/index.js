const {onCall} = require("firebase-functions/v2/https");
const location_notes_controller = require('./location_notes/controller');
const admin = require('firebase-admin');
admin.initializeApp();

exports.saveLocationNotes = onCall(location_notes_controller.onSaveLocationNotes);
exports.getLocationNotesWithInProximity = onCall(location_notes_controller.onGetLocationNotesWithInProximity);
