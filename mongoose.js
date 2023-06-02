const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://rajyphilip:qwerty1234@cluster1.eqqbwmb.mongodb.net/employeeReviewSystem?retryWrites=true&w=majority`);

const db = mongoose.connection ;

db.on('error',console.error.bind(console,"ERROR CONNECTING TO DATABASE"));
db.once('open', function(){
    console.log("Successfully connected to database:: MongoDB");
});

module.exports=db ; 