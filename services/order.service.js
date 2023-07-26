const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');


class OrderService{
    constructor(){
    }

////////////////////
    async fineOne(id){
        const order = await models.Order.findByPk(id,{
            //include:['customer'], asosiacion simeple 
            include:[{
                association:'customer',
                include:['user'],   
            },'items']
        });
        if (!order){
            throw boom.notFound('customer not found');
        }
        return order;
    }
/////////////////////////

    async create(data){
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async find(){
        return [];
    }

    async update(id,changes){
        return{id,
        changes};
    }

    async addItem (data){
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async findByUser(userId){
        
        const orders = await models.Order.findAll({
            where:{  // cutomer no tiene id por eso teneo que ir a lade user
                '$customer.user.id$':userId // consul por asosiacioens 
            },
            include:[
        {
            association:'customer',
            include:['user'],   
        }
    ]});
        return orders 
    }

    async delete(id){
        return {id}
    }

}

module.exports = OrderService;