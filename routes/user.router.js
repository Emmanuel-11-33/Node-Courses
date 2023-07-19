const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {updateUserSchema,createUserSchema,getUserSchema} = require('../schemas/users.schema');

const service = new UserService();

router.get('/', async (req,res,next) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
validatorHandler(getUserSchema, 'params'),
async (req,res,next) =>{
    try {
        const {id} =req.params;
        const user = await service.fineOne(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
    });

router.post('/',
validatorHandler(createUserSchema, 'body'),
async (req,res,next) =>{
    try {
        const body = req.body;
        const newUser = await service.create(body);
        res.json({newUser})
        
    } catch (error) {
        next(error)
    }
});

router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
async (req,res,next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        const user = await service.update(id,body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
validatorHandler(getUserSchema,'params'),
async (req,res,next)=>{
    try {
        const {id} = req.params;
        const deleteUser = await service.delete(id);
        res.json(deleteUser);
    } catch (error) {
        next(error);
    }
})



module.exports = router;