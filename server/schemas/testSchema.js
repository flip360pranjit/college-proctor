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
const testSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    numberOfQuestions: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    questions: [questionSchema]
});

module.exports = mongoose.model("test", testSchema);