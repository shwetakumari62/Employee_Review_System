const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type : String , 
        required : true
    },
    email:{
        type : String,
        required : true , 
        unique : true ,
    },
    password :{
        type : String ,
        required :true
    },
    admin:{
        type:Boolean,
    },
    avatar :{
        type:String
    },
    role :{
        type:String
    },
    department :{
        type:String
    },
    task:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'task'
        }],
    performance:{
        type:String
    },
    feedback:[{
        type:String,
        ref:'review'
    }]
},{
    timestamp : true
});


const User = mongoose.model('user', userSchema);
module.exports =User ;