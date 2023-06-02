const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    task:{
            name:{
                type:String,
                required:true
            },
            status: {
                type: Boolean,
            },
            rating:{
                type: Number
            }
        }
    ,
},{
    timestamps: true
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;


