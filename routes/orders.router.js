const express =require('express');

const OrderService = require('../services/order.service');
const validatosHandler = require('../middlewares/validator.handler');
const {getOrderSchema,createOrderSchema,addItemSchema} = require('../schemas/order.schema');


const router = express.Router();
const service = new OrderService();


router.get('/:id', 
validatosHandler(getOrderSchema,'params'),
async (req, res,next)=>{ // significan parameto
    try {
        const {id}= req.params; // {} de todos los parametro solo me interesa id 
        const order =  await service.fineOne(id);
        res.json(order);
        
    } catch (error) {
        next(error);
    }
});


router.post('/',
validatosHandler(createOrderSchema,'body'),
async (req,res,next)=>{
    try {
        const body = req.body;
        const newOrder = await service.create(body);
        res.json(newOrder); // {newProduct}  segresa arreglo de nuevo producto
        
    } catch (error) {
        next(error);
    }
    
});

router.post('/add-item',
validatosHandler(addItemSchema,'body'),
async (req,res,next)=>{
    try {
        const body = req.body;
        const newItem = await service.addItem(body);
        res.json(newItem); // {newProduct}  segresa arreglo de nuevo producto
        
    } catch (error) {
        next(error);
    }
    
});



module.exports = router;
