
const {getFirestore} = require("firebase-admin/firestore");

exports.updatePlayerCount = function(organiserId, gameId){

   const docRef =  getFirestore().collection('travel_game_organisers').doc(organiserId).collection('games').doc(gameId);
   return docRef.get().then(doc =>{
    const currentTotalPlayers = doc.data().totalPlayers;
    var totalPlayers = 0;
    if(currentTotalPlayers === null || currentTotalPlayers === undefined || currentTotalPlayers === 'undefined'){
        totalPlayers = 1;                    
    }
    else{
        totalPlayers = currentTotalPlayers + 1;
    }

    docRef.update({
        "totalPlayers": totalPlayers
    })
    
   });

}