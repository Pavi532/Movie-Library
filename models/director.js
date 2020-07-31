const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tmbd_id:{
        type:String,
        required:false
    },
    imdb_id:{
        type:String
    }
});

module.exports = mongoose.model('Director',directorSchema);