const boom  = require('@hapi/boom');
const bcrypt=require('bcrypt');
const {models}=require('../libs/sequelize');


class CustumerService {
    constructor(){}
////////////////////
    async fineOne(id){
        const customer = await models.Customer.findByPk(id);
        if (!customer){
            throw boom.notFound('customer not found');
        }
        return customer;
    }
/////////////////////////

    async create(data){
        const hash = await bcrypt.hash(data.user.password,10);// porque esta anidado en user 
        const newData = {
            ...data, // clono la data 
            user :{
                ...data.user, // clono a user 
                password:hash
            }
        }
        

        const newCustomer = await models.Customer.create(newData,{
            include:['user']
        });

        delete newCustomer.user.dataValues.password;
        
        return newCustomer;
    }

    async find(){
        const rta = await models.Customer.findAll({
            include:['user'] // esta es la asociacion de la base de datos, con esto me tra tambien lo de users
        });
        return rta;
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

module.exports = CustumerService;