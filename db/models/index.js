// aqui van todos los modelos
const {User,UserSchema} = require('./user.model');
const {Customer,CustomerSchema} = require('./custumer.model');
const {Category,CategorySchema}= require('../models/category.model');
const {Product,ProductSchema} = require('../models/product.model');
const {Order,OrderSchema} = require('./order.model');
const {OrderProduct,OrderProductSchema} = require('./order-product.model')


function setupModels(sequelize){
    // aqui todo el set inicial 
    User.init(UserSchema,User.config(sequelize));
    Customer.init(CustomerSchema,Customer.config(sequelize));
    Category.init(CategorySchema,Category.config(sequelize));
    Product.init(ProductSchema,Product.config(sequelize));
    Order.init(OrderSchema,Order.config(sequelize));
    OrderProduct.init(OrderProductSchema,OrderProduct.config(sequelize));




    //aqui ponesmo las asociaciones
    Customer.assocciate(sequelize.models);
    User.assocciate(sequelize.models);
    Category.assocciate(sequelize.models);
    Product.assocciate(sequelize.models);
    Order.assocciate(sequelize.models);
    

}

module.exports = setupModels;