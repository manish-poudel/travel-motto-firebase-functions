
const travel_games_firestore = require('./travel_games_firestore');
exports.updateTravelGamePlayer = function(event){
    const organiserId = event.params.organiserId;
    const gameId = event.params.gameId;
    return travel_games_firestore.updatePlayerCount(organiserId, gameId);
}