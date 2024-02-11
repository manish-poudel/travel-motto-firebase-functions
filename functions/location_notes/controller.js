const save_location_notes = require('./save_location_notes');
const get_location_notes = require('./get_location_notes');
const geoFire = require('geofire-common');
const {Timestamp} = require('firebase-admin/firestore');


exports.onSaveLocationNotes = async (request) =>{
    if(!request.auth){
        // return empty if user is not authenticated
        return {};
    }
    const authorId = request.data.authorId; // Id of the user
    const title = request.data.title; // title of the note
    const notes = request.data.notes; // desc of the note
    const lat = request.data.lat; // lat of the location
    const lng = request.data.lng; // long of the location
    const fullAddress = request.data.fullAddress;
    const authorName = request.data.authorName;

    const geoHash = geoFire.geohashForLocation([lat, lng]); // Get geo hash for the location
    const noteId = save_location_notes.generateLocationNoteId();//Generate location note id
    const now = Timestamp.now(); //current time
    
    const noteData =  {
        "authorId": authorId,
        "noteId": noteId,
        "title": title,
        "notes": notes,
        "lat": lat,
        "lng": lng,
        "views": 0,
        "authorName": authorName,
        "fullAddress": fullAddress,
        "createdAt": now,
        "updatedAt": now,
        "geoHash": geoHash,
        "state": "active"         
     };

    return await save_location_notes.saveLocationNotesToFirestore(noteId, noteData).then(docRef =>{
        return noteData;
    }).catch(err =>{
        return {};
    }) // add note to firestore
};


exports.onGetLocationNotesWithInProximity = async(request) =>{
    // if user is not authenticated, return empty list
    if(!request.auth){
        return [];
    }

    // Get long, lat
    const radiusInM = 108; // finding items within 108m proximity
    const userCenterLocation = [request.data.lat, request.data.lng] // user current location

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geoFire.geohashQueryBounds(userCenterLocation, radiusInM);
    const snapshots = await get_location_notes.getNotesWithInBoundsFromFirstore(bounds); 
    const matchingDocs = [];
    for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.data()['lat'];
          const lng = doc.data()['lng'];
          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = geoFire.distanceBetween([lat, lng], userCenterLocation);
        const distanceInM = distanceInKm * 1000;
         if (distanceInM <= radiusInM) {
            matchingDocs.push(doc.data());
         }
      }
    }
    return matchingDocs;
}; 