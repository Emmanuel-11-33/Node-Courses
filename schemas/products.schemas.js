const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const desctription = Joi.string().min(10)
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const createProductSchema = Joi.object({
    name:name.required(),
    price:price.required(),
    image:image.required(),
    description:desctription.required(),
    categoryId:categoryId.required(),
});

const updateProductSchema = Joi.object({
    name:name,
    price:price,
    image:image,
    description:desctription, // error de nombre 
    categoryId, // la nueva sintaxis donde ya asigan el valor
});

const getProductSchema = Joi.object({
    id:id.required(),
});


const queryProductSechema  = Joi.object({
    limit,
    offset,
    price,
    price_min,
    price_max:Joi.when('price_min', {
      is: Joi.exist(),
      then:price_max.required()
    })
  });
  
module.exports = {createProductSchema,updateProductSchema,getProductSchema,queryProductSechema }



/*

const queryProductSechema = Joi.object({
    limit,
    offset, // usando la nueva sintaxis 
    price,
    price_min,
    price_max: price_max.when('price_min', { // esta es una validacion de la libreria joi 
        is:Joi.number().integer(), // si  el valor es un numero entero //5 (tambien podria ser un valor fijo)
        then: Joi.required() // el campo sera requerido 
    })
});
*/