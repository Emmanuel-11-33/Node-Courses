const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const OrderService = require('../services/order.service');
const router = express.Router();
const service = new OrderService();


router.get('/my-order',
passport.authenticate('jwt', {session:false}),//cualquier usuario puede
async (req,res,next) =>{
    try {
        const user = req.user; // el token nos deje el req del en el payload(sub)
        const orders = await service.findByUser(user.sub);
        res.json(orders);
    } catch (error) {
        next(error)
    }
});



module.exports = router;