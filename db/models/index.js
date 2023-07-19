const {User,UserSchema} = require('./user.model');
const {Customer,CustomerSchema} = require('./custumer.model');
// aqui van todos los modoloes 

function setupModels(sequelize){
    User.init(UserSchema,User.config(sequelize));
    Customer.init(CustomerSchema,Customer.config(sequelize));
    // aqui todo el setas inicial 


    //aqui ponesmo las asociaciones
    Customer.assocciate(sequelize.models)
    User.assocciate(sequelize.models);
}

module.exports = setupModels;