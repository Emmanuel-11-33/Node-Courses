const boom  = require('@hapi/boom');
const {models }=require('../libs/sequelize');


class UserService {
    constructor(){}
////////////////////
    async fineOne(id){
        const user = await models.User.findByPk(id);
        if (!user){
            throw boom.notFound('User not found');
        }
        return user;
    }
/////////////////////////

    async create(data){
        const newUser = await models.User.create(data);
        return newUser;
    }

    async find(){
        const rta = await models.User.findAll({
            include:['customer']
        });
        return rta;
    }


    async update(id,changes){
        const user = await this.fineOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id){
        const user = await this.fineOne(id);
        await user.destroy();
        return {id}; // retorno que?? 
    }

}

module.exports = UserService;