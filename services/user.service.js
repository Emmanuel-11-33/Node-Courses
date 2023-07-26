const boom  = require('@hapi/boom');
const bcrypt=require('bcrypt');
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
        const hash = await bcrypt.hash(data.password,10);
        const newUser = await models.User.create({
            ...data,
            password: hash
        });
        delete newUser.dataValues.password;// realmente los valores estan en data values  en el cas ose secualise
        return newUser;
    }

    async find(){
        const rta = await models.User.findAll({
            include:['customer']
        });
        return rta;
    }

    async findbyEmail(email){ // esto porque el user name de este sistema es el email 
        const rta = await models.User.findOne({ // retorna el 1 usuario que concuerde
            where:{email}  // el email
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