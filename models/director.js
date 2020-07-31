const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imdb_id:{
        type:String
    },
    tmdb_id:{
        type:String
    }
});

module.exports = mongoose.model('Director',directorSchema);