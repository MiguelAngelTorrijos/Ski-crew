const router = require("express").Router(); 
const User = require('./../models/User.model');
const bcrypt = require('bcrypt')

router.get('/' ,  (req, res , next) => {
      res.redirect('/auth/login')
})


router.get('/auth/login' , (req,  res , next) => {
      res.render('./auth/login-page')
}) 

router.post('/auth/login' , (req, res , next) => {
      const{username, password} = req.body; 
      if(username.length === 0 || password.length === 0){
          res.render('./auth/login-page' , {errorMsg: 'Rellena los campos'}) 
          return
      }


     User 
       .findOne({username}) 
       .then((user) =>{
           if(!user){
               res.render('./auth/login-page', {errorMsg: 'Usuario no reconocido'})
               return 
           } 
           if (bcrypt.compareSync(password, user.password) === false) {
               res.render('./auth/login-page', { errorMsg: 'Contraseña incorrecta' })
               return
           }  
            
           req.session.currentUser = user
           res.redirect('/stations');
        
           
       }) 
       .catch(err => console.log(err));

})
 

router.get('/stations' , (req, res ,next) => { 
      res.send('Hello World');
})


router.get('/auth/sign-in', (req, res, next) => {
    res.render('./auth/sign-in');
})

router.post('/auth/sign-in', (req, res, next) => {
    const{username, password, email} = req.body; 
 
    User 
     .findOne({username}) 
     .then((user) => {
          if(user) {
              res.render('./auth/sign-in' , {errorMsg: 'Usuario ya registrado'});
          }
     })   


     const bcryptSalt = 10; 
     const salt = bcrypt.genSaltSync(bcryptSalt); 
     const hashPass = bcrypt.hashSync(password, salt);

    User 
     .create({username , password: hashPass , email}) 
     .then(() => {
         res.redirect('/auth/sign-in');
     }) 
    
     .catch(err => console.log(err));
}) 


router.get('/logout' , (req, res , next) => {
    req.session.destroy(() => res.redirect('/auth/login'));
})


module.exports = router; 
