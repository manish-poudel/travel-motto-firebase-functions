const {getFirestore} = require("firebase-admin/firestore");


exports.updateLocationNoteViewCount = (noteId) =>{ 
    console.log("About to update views of the note ", noteId);
    const collectionRef = getFirestore().collection('location_notes'); 
    return collectionRef.doc(noteId).get().then(doc =>{
        
        const views = doc.data().views + 1;
        collectionRef.doc(noteId).update({
            "views": views
        })
    });
};