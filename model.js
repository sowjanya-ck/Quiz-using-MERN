const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let detail = new Schema({
    id: {
        type: Number
    },
    question: {
        type: String
    },
    options: {
        type: Array
    },
    answer: {
        type: String
    }
});

module.exports = mongoose.model("detail", detail);