const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Repository');

const documentSchema = new mongoose.Schema({
    docId: {
        type: Number,
        required: true 
    },
    docTitle: {
        type: String,
        required: true 
    },
    docContent: {
        type: String,
        required: true 
    },
    
        timestamps: { type: Date, default: () => new Date() }
    
});

const Documents = mongoose.model('Documents', documentSchema);

module.exports = {
    Documents
};






