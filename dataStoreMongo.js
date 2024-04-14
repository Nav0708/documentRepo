const { Documents } = require('./models/mongoModels')
let dbDoc

async function addDocument(document) {
    dbDoc = new Documents(document)
    const result = await dbDoc.save()
    return result.docId
}

async function displayAllDocuments() {
    const data = await Documents.find();
    const result = data.map(document => ({
        uid: document._id,
        docId:document.docId,
        docTitle: document.docTitle,
        timestamps: document.timestamps
    }));
    return result;
}
async function viewDocument(id) {
    const data = await Documents.find({_id : id});
    const result = data.map(document => ({
        id : document._id,
        docid: document.docId,
        docTitle: document.docTitle,
        docContent: document.docContent,
        timestamps:document.timestamps
    }));
    return result;
}

async function searchDocument(id) {
    const data = await Documents.find({docId : id});
    const result = data.map(document => ({
        id : document._id,
        docid: document.docId,
        docTitle: document.docTitle,
        docContent: document.docContent,
        timestamps: document.timestamps
    }));
    console.log(result)
    return result;
}

async function editDocument(Content,Id) {
    var updated_date=new Date()
    const result= await Documents.updateMany({ _id : Id},{$set :{docContent : Content , timestamps: updated_date}})
    return result
}

async function deleteDocument(id) {
    const result = await Documents.deleteOne({_id : id});
    return result
}


module.exports = {
    addDocument,
    displayAllDocuments,
    viewDocument,
    editDocument,
    deleteDocument,
    searchDocument
}