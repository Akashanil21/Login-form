
const { response } = require('express');
var express = require('express');
var router = express.Router();
const credential ={
    email:"akash21@gmail.com",
    password:"mirage96"
};

// login user
router.post('/login',(req,res)=>{
    // response.setHeader("cache-control","no-cache, no-store, must-revalidate");
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successful...!");
    }else if(req.body.email!=credential.email && req.body.password==credential.password){
        res.end("Invalid Username");
    }else if(req.body.email==credential.email && req.body.password!=credential.password){
        res.end("Invalid Password");
        
    }else{
        res.end("Invalid Entry");
        
    }
        
    
})
// route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }else{
        res.send("Unauthorize User");
    }
})
// route for logout

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title:"Express",logout:"Logout Successfully...!"});
        }
    })
})

module.exports = router;