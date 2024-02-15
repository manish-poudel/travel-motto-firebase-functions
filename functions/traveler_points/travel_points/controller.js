
const travel_completion_points = require('../save_traveler_points');
const points_calculator= require('../../utils/points_calculator');
exports.onTravelCompletion = async(event) =>{

    const newValue = event.data.after.data();
    const oldValue = event.data.before.data();

    const travelerId =  event.params.travelerId;

    // it means the travel was completed
    if(oldValue.status == "started" && newValue.status == "completed"){
        const pointAchieved = points_calculator.calculateTravelPoint(newValue);
        return travel_completion_points.addPoints(travelerId, newValue.id, "travel_completion", pointAchieved);
    }   
}