const express = require('express');
const passport = require('passport');

const AuthService= require('../services/auth.service');


const router = express.Router();
const service = new AuthService();


router.post('/login',
passport.authenticate('local', {session:false}),
async (req,res,next) =>{
    try {
        const user = req.user;
        res.json(service.singToken(user))
       
    } catch (error) {
        next(error)
    }
});

router.post('/recovery',
// capa de validacion de datos 
async (req,res,next) =>{
    try {
        const {email} = req.body; // esto lo puedo validar con un squema 
        const rta = await service.sendRecovery(email);
        res.json(rta);
    } catch (error) {
        next(error)
    }
});


router.post('/change-password',
// capa de validacion de datos 
async (req,res,next) =>{
    try {
        const {token,newPassword} = req.body; // esto lo puedo validar con un squema 
        const rta = await service.changePassword(token,newPassword);
        res.json(rta);
    } catch (error) {
        next(error)
    }
});


module.exports = router;