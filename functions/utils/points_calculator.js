const geoFire = require('geofire-common');


/// To keep it simple, we will find the distance covered and half it.
/// which means user will recieve 0.5 point for each 1 km travelled. 
/// So, if user travels 9km, he recieves 9.5 but rounded to 10
exports.calculateTravelPoint = function(travel){
    // The point where user started and ended his travel
    const startedPos = travel.startedPos;
    const completedPos = travel.completedPos;

    // Find the distance covered by the user
    const distanceCovered = geoFire.distanceBetween(startedPos, completedPos);
    return Math.round(distanceCovered / 2);    
}

