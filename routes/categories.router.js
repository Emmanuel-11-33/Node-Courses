const express = require('express');
const router = express.Router();
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler'); 

const CategoryService=require('../services/category.service')
//const {checkAdminRole} = require('../middlewares/aunt.handler'); 
const {checkRoles} = require('../middlewares/aunt.handler'); 
const {createCategorySchema,updateCategorySchema,getCategorySchema} = require('../schemas/category.schema');


const service = new CategoryService();


router.get('/', 
passport.authenticate('jwt', {session:false}),// manejo de sesion falso = esto porque no se usasn cookies
checkRoles('admin','customer'),
async (req,res,next) => {
    try {
        const categorys = await service.find();
        res.json(categorys);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req,res,next) =>{
    try {
        const {id} =req.params;
        const category = await service.findOne(id);
        res.json(category);
    } catch (error) {
        next(error);
    }
    });

// se va a protejer el endpoint de categorias para que solo se puedan potear 
router.post('/',
passport.authenticate('jwt', {session:false}),// manejo de sesion falso = esto porque no se usasn cookies
//checkAdminRole,
checkRoles('admin'),
validatorHandler(createCategorySchema, 'body'),
async (req,res,next) =>{
    try {
        const body = req.body;
        const newCategory = await service.create(body);
        res.json(newCategory)
        
    } catch (error) {
        next(error)
    }
});

router.patch('/:id',
validatorHandler(getCategorySchema, 'params'),
validatorHandler(updateCategorySchema, 'body'),
async (req,res,next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        const category = await service.update(id,body);
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
validatorHandler(getCategorySchema,'params'),
async (req,res,next)=>{
    try {
        const {id} = req.params;
        const deleteCategory = await service.delete(id);
        res.json(deleteCategory);
    } catch (error) {
        next(error);
    }
})



module.exports = router;