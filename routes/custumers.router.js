const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler'); 

const CustomerService=require('../services/custumer.service');
const {getCustomerSchema,createCustomerSchema,updateCustomerSchema} = require('../schemas/costumer.schema');


const service = new CustomerService();


router.get('/', async (req,res,next) => {
    try {
        const customers = await service.find();
        res.json(customers);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
validatorHandler(getCustomerSchema, 'params'),
async (req,res,next) =>{
    try {
        const {id} =req.params;
        const customer = await service.fineOne(id);
        res.json(customer);
    } catch (error) {
        next(error);
    }
    });

router.post('/',
validatorHandler(createCustomerSchema, 'body'),
async (req,res,next) =>{
    try {
        const body = req.body;
        const newCustomer = await service.create(body);
        res.json(newCustomer)
        
    } catch (error) {
        next(error)
    }
});

router.patch('/:id',
validatorHandler(getCustomerSchema, 'params'),
validatorHandler(updateCustomerSchema, 'body'),
async (req,res,next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        const customer = await service.update(id,body);
        res.json(customer);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
validatorHandler(getCustomerSchema,'params'),
async (req,res,next)=>{
    try {
        const {id} = req.params;
        const deleteCustomer = await service.delete(id);
        res.json(deleteCustomer);
    } catch (error) {
        next(error);
    }
})



module.exports = router;