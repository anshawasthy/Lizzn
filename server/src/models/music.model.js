const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri : {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true
    },
    artistId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    artist: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('music', musicSchema);