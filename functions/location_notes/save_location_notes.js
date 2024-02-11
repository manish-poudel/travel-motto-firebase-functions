const {getFirestore} = require("firebase-admin/firestore");


exports.saveLocationNotesToFirestore = (noteId, data) =>{ 
    const collectionRef = getFirestore().collection('location_notes'); 
    return collectionRef.doc(noteId).set(data);
};

/// Generate location node id
exports.generateLocationNoteId = () =>{
    const collectionRef = getFirestore().collection('location_notes'); 
    const noteId = collectionRef.doc().id;
    return noteId;
};