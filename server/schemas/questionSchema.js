const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionNumber: Number,
    questionType: String,
    points: Number,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String
});

module.exports = mongoose.model("question", questionSchema);