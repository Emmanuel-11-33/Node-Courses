const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');


class CategoryService {

    constructor(){

    }

///////////

async findOne(id){
    const category = await models.Category.findByPk(id,{
        include:['products']
    });
    if (!category){
        throw boom.notFound('Category not found');
    }
    return category;
}
//////////
    async create(data){
        const newCategory = await models.Category.create(data);
        return newCategory;
    }

    async find(){
        const categories = await models.Category.findAll();
        return categories;
    }


    async update(id,changes){
        return{
            id,
            changes
        };
    }

    async delete(id){
        return {id};
    }




}

module.exports = CategoryService;
