
const {getFirestore} = require("firebase-admin/firestore");

exports.addPoints = async function(travelerId,providerId,providerType,pointsAchieved){
    try{
        console.log("Traveller id: ", travelerId);
        console.log("Points achieved: ", pointsAchieved);

        return getFirestore().runTransaction(async tx => {
            
            const travelerDocRef = getFirestore().collection("travellers").doc(travelerId);
            const travelerPointDocRef = getFirestore().collection('travellers').doc(travelerId).collection('point_providers').where("providerId", "==", providerId);
            const travelerPointDocs = await tx.get(travelerPointDocRef);

            // Empty means user has not recieved for this point, now lets do write operations
            if(travelerPointDocs.empty){
                const travelerDoc = await travelerDocRef.get();
                var totalPoint = 0;
                const travelerPoints = travelerDoc.data().points;

                // Increment traveler points
                if(travelerPoints === null || travelerPoints === undefined || travelerPoints === 'undefined'){
                    totalPoint = pointsAchieved;                               
                }
                else{
                    totalPoint = travelerPoints + pointsAchieved ; 
                }

                console.log("New points of the user", totalPoint);

                await tx.update(travelerDocRef, {
                    "points": totalPoint
                });

                const collectionRef = getFirestore().collection('travellers').doc(travelerId).collection('point_providers');
                const id = collectionRef.doc().id;
                const docRef= collectionRef.doc(id);
                await tx.set(docRef, {
                    "providerId": providerId,
                    "providerType": providerType,
                    "points": pointsAchieved
                });
            }
            else{
                throw 'Traveler has already received point for this provider id: ' + providerId;
            }
        }).catch(err =>{
            console.log("error" + err);
        });
    }
    catch(err){
        console.log('Transaction failure:', err);
        return null;
    }
}