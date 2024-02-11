const {getFirestore} = require('firebase-admin/firestore');


exports.getNotesWithInBoundsFromFirstore = async (bounds)=>{
    const promises = [];
    const collectionRef = getFirestore().collection('location_notes');
    for (const bound of bounds) {
        const query = collectionRef.orderBy('geoHash').startAt(bound[0]).endAt(bound[1]);
        promises.push(query.get());
    }
    return await Promise.all(promises);
}


