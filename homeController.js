
module.exports.landingPage = async(req,res)=>{
    if(req.isAuthenticated()){
        return  res.redirect('/user/home')
    } 
    return  res.render('landingPage')
}

module.exports.signInPage = async(req,res)=>{
    if(req.isAuthenticated()){
        return  res.redirect('/user/home')
    } 
    return  res.render('signIn')
}
module.exports.signUpPage = async(req,res)=>{
    if(req.isAuthenticated()){
        return  res.redirect('/user/home')
    } 
    return  res.render('signUp')

}

