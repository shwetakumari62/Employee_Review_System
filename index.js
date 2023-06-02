const express = require('express');
const app = express();
const port = 8000 ; 
const Database = require('./config/mongoose');
const MongoStore = require('connect-mongo');

//for getting form data
app.use(express.urlencoded());

//node sass middleware
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src :'./assets/scss',
    dest :'./assets/css',
    debug : false,
    outputStyle :'extended',
    prefix : '/css' 
})); 

//express layout 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// views // 
app.set('view engine','ejs');
app.set('views','./views');

//path
const path = require('path');
app.use(express.static(path.join(__dirname,'assets')));

//cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//session
const session = require("express-session") ;
app.use(session({
    secret: "habiti",
    saveUninitialized:false,
    resave: false ,
    cookie: {
         maxAge: 1000 * 60 *100
        },
    store: MongoStore.create({
        client : Database.getClient() ,
        autoRemove : 'disabled'
    },function(err){
        console.log(err || 'Connnect-mongodb setup ok')
    })
}));

//passport
const passport = require('passport');
const localPassport = require('./config/passport-local');
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash
const flash = require('connect-flash');
const flashMiddleWare = require('./config/flash');
app.use(flash());  // we r using flash after session cookie bcoz it stores its info in cookies
app.use(flashMiddleWare.setFlash); //custom middleware for flash



app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})


