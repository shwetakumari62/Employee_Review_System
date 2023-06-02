const Review = require('../models/review');
const User= require('../models/user');

//user home
module.exports.home = async(req,res)=>{
    if(req.isAuthenticated()){
        let allEmployee = await User.find({});        
        let newEmployee = allEmployee.filter((employee)=>{
            return employee.id !== req.user.id
        });

        return  res.render('home',{
            allEmployee:newEmployee,
        });
    }
    return  res.redirect('back');
}

//user profile
module.exports.profile = async (req,res)=>{
    if(req.isAuthenticated()){
        let userProfile = await User.findById({ _id: req.params.id }).populate('task');
        console.log('userprofiel length##',userProfile.task.length);
    return  res.render('profile',{
        profile:userProfile
    });
    }
    return  res.redirect('/');
}

//user login
module.exports.login = async(req,res)=>{
    return  res.redirect('/user/home')
} 
//user logout
module.exports.logOut = async(req,res)=>{
    req.logout(function(err){
        if(err){
            return console.log("error",err)
        }
        return res.redirect('/')
    })
}


//functions 


// creating user and adding to database
module.exports.createUser = async(req,res)=>{
    try {
        if(req.body.password != req.body.confirmPassword){
        req.flash('error',"Passwords do not match");
            return res.redirect('back')
        }
        let user =  await  User.findOne({email:req.body.email}) ;
        if(!user){
            let {name,email,password,isAdmin,role,department} = req.body ;
            User.create({
                name: name,
                email: email,
                password: password,  
                admin: false,
                role: role ,
                department:department

            })
            req.flash('success',"User Created successfully");
            return res.render('signIn')
        }
        req.flash('error',"User Already Present");
        return res.redirect('back')
    } catch (err) {
        console.log("error ",err);
    }
}

// user feedback
module.exports.feedback = async(req,res)=>{
    if(req.isAuthenticated()){
        try {
            let updatedReview = await Review.findOneAndUpdate(
                { tobereviewed: req.params.profileID, reviewer: req.user._id },
                { feedback: req.body.feedback, feedbackstatus: true },
                { new: true }
            );
            let user = await User.findByIdAndUpdate({_id:req.user._id});
            if (!updatedReview) {
                req.flash('error',"Cannot Submit Feedback");
            }
            console.log("UPdaterevuew",updatedReview);
            console.log("user",user);

            user.feedback.pop(updatedReview._id);
            user.save();
            
            console.log("UPdaterevuew########",updatedReview);
            console.log("user####",user);
            return res.redirect('back');
        } catch (error) {
            return console.log("ERROR", error);
        }
    }
    return  res.redirect('back');
}