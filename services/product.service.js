//const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

const {models}= require('../libs/sequelize');

const { Op } = require('sequelize');// operadores de squelize para los filtros 


class ProductsService {


    constructor(){
 
    }
//////////////////
async findOne(id){
    const product = await models.Product.findByPk(id);
        if (!product){
            throw boom.notFound('Product not found');
        }
        if(product.isBlock){
            throw boom.conflict('Product is block');
        }
        return product;
    }
/////////////////
    async create (data){
        const newProduct  = await models.Product.create(data);
        return newProduct;
    }

    async find(query){

        const options = {
            include:['category'],
            where:{},
        }

        const {limit,offset} = query;
        if(limit && offset){
            options.limit = limit;
            options.offset = offset;
        }

        const {price} = query;
        if(price){
            options.where.price = price;
        }

        const { price_min, price_max } = query;
        if (price_min && price_max) {
        options.where.price = {
            [Op.gte]: price_min,
            [Op.lte]: price_max,
        };
    }
    
        const products  = await models.Product.findAll(options);
        return products;
    }

    async update(id,changes){
        const model = await this.fineOne(id);
        const rta = await model.update(changes);
        return rta;
    }

    async delete(id){
        const cudtumer = await this.fineOne(id);
        await cudtumer.destroy();
        return {id,
        rta: true}; // retorno que?? = un array con el id
    }

}

module.exports = ProductsService;

    /*
     async find(){
        const products  = await models.Product.findAll({
            include:['category'],
        });
        return products;
    }
    */

   /*
       async find(query){
        const options = {
            include:['category'],
        }
        const {limit,offset} = query;
        if(limit && offset){
            options.limit = limit;
            options.offset = offset;
        }
        const products  = await models.Product.findAll(options);
        return products;
    }
   
   
   */