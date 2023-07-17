const express =require('express');

const ProductsService = require('../services/product.service');
const validatosHandler = require('../middlewares/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema} = require('../schemas/products.schemas')


const router = express.Router();
const service = new ProductsService();


router.get('/', async (req,res)=>{
  const products = await service.find();
    res.json(products);
});

router.get('/:id', 
validatosHandler(getProductSchema,'params'),
async (req, res,next)=>{ // significan parameto
    try {
        const {id}= req.params; // {} de todos los parametro solo me interesa id 
        const product =  await service.findOne(id);
        res.json(product);
        
    } catch (error) {
        next(error);
    }
});


router.post('/',
validatosHandler(createProductSchema,'body'),
async (req,res,next)=>{
    try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.json({newProduct});
        
    } catch (error) {
        next(error);
    }
    
});

//Put 


router.patch('/:id', 
validatosHandler(getProductSchema,'params'),
validatosHandler(updateProductSchema,'body'),
async (req,res, next)=>{
    try {
        const {id} = req.params;
        const changes = req.body;
        const updateProduct= await service.update(id,changes);
        res.json(updateProduct);
        
    } catch (error) {
     next(error)
    }
   
});

router.delete('/:id', async (req,res,next)=>{
    try {
    const {id} = req.params;
    const deleatProduct =  await service.delete(id);
    res.json(deleatProduct);
        
    } catch (error) {
        next(error)
    }
});


module.exports = router;
