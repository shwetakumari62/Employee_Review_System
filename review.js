
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tobereviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    feedback: {
        type: String,
    },
    feedbackstatus:{
        type: Boolean,
        default:false
    }
    }, {
timestamps: true
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;