const User = require("../models/user");
const Task = require('../models/task');
const Review = require('../models/review');
const { localsName } = require("ejs");


//   add Employee page
module.exports.addEmployee = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('addEmployee');
        }
    return res.redirect('back');
  };
//   Review page
module.exports.reviewPage = async (req, res) => {
    if (req.isAuthenticated()) {
        let allReviews = await Review.find({}).populate('tobereviewed').populate('reviewer');

        return res.render('reviewPage',{
            allReviews:allReviews
        });
        }
    return res.redirect('back');
  };
//delete employee
module.exports.deleteUser = async(req,res)=>{
    if(req.isAuthenticated()){
        try {
            let deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
        return  res.redirect('/user/home')

        } catch (error) {
            console.log("ERror",error);
        }
        return  res.redirect('/user/home')
    } 
    return  res.render('landingPage')
}

//update employee
module.exports.updateUser = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            let user = await User.findByIdAndUpdate({ _id: req.params.id });
            user.role=req.body.role ;
            user.department=req.body.department ;
            user.performance=req.body.performance ;
            user.save();
 
            return res.redirect('back');
        } catch (error) {
            console.log('Error', error);
        }
      return res.redirect('/user/home');
        }
    return res.render('landingPage');
  };




//   add employee as user 
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
            req.flash('success',"Employee added successfully");
            return res.redirect('back')
        }
        req.flash('error',"Employee Already Present");
        return res.redirect('back')
    } catch (err) {
        console.log("error ",err);
    }
}


//adding task to user 
module.exports.addTask = async (req, res) => {
    if (req.isAuthenticated()) {
        try {

            const user= await User.findByIdAndUpdate({_id:req.params.id});
            const task = await Task.create({
            user:req.params.id,
            task:{
                name:req.body.task,
                status:false
            }
        });
        user.task.push(task._id);
        user.save();
    
    return res.redirect('back');
        } catch (error) {
            return console.log("error",error)
        }
        }
    return res.render('landingPage');
  };

// removing task from user 
module.exports.removeTask = async(req,res)=>{
    if(req.isAuthenticated()){
        try {
            
            let user = await User.findByIdAndUpdate({_id:req.params.user});
            let deleteTask = await Task.findByIdAndDelete({ _id: req.params.id });
            user.task.pop(req.params.id)
            user.save();
        return  res.redirect('back');
        } catch (error) {
            console.log("ERror",error);
        }
        return  res.redirect('/user/home')
    } 
    return  res.render('landingPage')
}

// changing task status
module.exports.changeTaskStatus = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            let task = await Task.findByIdAndUpdate({ _id: req.params.id });
            let val = task.task.status ;
            task.task.status = !val ;
            task.save();
            return res.redirect('back');
        } catch (error) {
            console.log('Error', error);
        }
      return res.redirect('/user/home');
        }
    return res.render('landingPage');
  };

  // toggling user as admin
module.exports.toggleAdmin = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            let user = await User.findByIdAndUpdate({ _id: req.params.id });
            let val = user.admin ;
            user.admin = !val ;
            user.save();
            return res.redirect('back');
        } catch (error) {
            console.log('Error', error);
        }
      return res.redirect('/user/home');
        }
    return res.render('landingPage');
  };

//assingning review
module.exports.assignReview = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            console.log(req.body)
            const user = await User.findByIdAndUpdate({_id:req.body.reviewer});
 
            let review = await  Review.create({
            reviewer:req.body.reviewer,
            tobereviewed:req.body.tobereviewed
        });

        
        user.feedback.push(req.body.tobereviewed);
        user.save();
            return res.redirect('back');
        } catch (error) {
            return console.log(error);
        }
    }
    return res.render('landingPage');
};

//submitting the feedback 



