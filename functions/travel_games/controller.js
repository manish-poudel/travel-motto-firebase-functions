
const travel_games_firestore = require('./travel_games_firestore');
const travel_completion_points = require('../traveler_points/save_traveler_points');

exports.onTravelGamePlayerCreated = function(event){
    const organiserId = event.params.organiserId;
    const gameId = event.params.gameId;
     /// if user has completed task
     if(event.data.completed == true){
        travel_completion_points.addPoints(event.data.id, gameId, "travel_game_completion", 50);     
    }
    /// Update player count
    travel_games_firestore.updatePlayerCount(organiserId, gameId);   
}


exports.onTravelGamePlayerUpdated = function(event){
    const gameId = event.params.gameId;

    /// if user completed task this time
    if(event.data.before.data().completed == false && event.data.after.data().completed == true){
        travel_completion_points.addPoints(event.data.after.data().id, gameId, "travel_game_completion", 50);   
    }
}