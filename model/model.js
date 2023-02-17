const mongoose = require('mongoose');


const SCHEEMA = new mongoose.Schema([{
    "name": String,
    "assessmentMonth": {
        "month": Number,
        "year": Number
    },
    "Gap": Number,
    "improvement": []
}])



const COLLECTION = new mongoose.model("Recommendation", SCHEEMA);

module.exports = COLLECTION