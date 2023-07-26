const express = require('express');

const productRouter =  require ('./products.router');
const userRouter = require ('./user.router');
const categoriesRouter = require('./categories.router');
const customerRouter = require('./custumers.router');
const orderRouter=require('./orders.router');
const authRouter=require('./auth.router');
const profileRouter=require('./profile.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router)

    router.use('/products',productRouter);
    router.use('/users',userRouter);
    router.use('/categories',categoriesRouter);
    router.use('/customer',customerRouter);
    router.use('/orders',orderRouter);
    router.use('/auth',authRouter);
    router.use('/profile',profileRouter);

}

module.exports = routerApi;