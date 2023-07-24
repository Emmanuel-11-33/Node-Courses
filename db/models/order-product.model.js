const { Model, DataTypes, Sequelize } = require('sequelize');

const {ORDER_TABLE} = require('./order.model')
const {PRODUCT_TABLE} = require('./product.model')

const ORDER_PRODUCT_TABLE = 'order_producs';

const OrderProductSchema={
    id: {
        allowNull: false, // no va ser nulo 
        autoIncrement: true, // va ir incrementando 
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
      amount:{ // cantidad
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId:{
        field :'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references :{
          model:ORDER_TABLE,
          key:'id'
        },
        onUpdate:'CASCADE', // que hace cunado se actualiza
        onDeletee:'SET NULL' // que pasa si borro 
    },
    productId:{
        field :'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references :{
          model:PRODUCT_TABLE,
          key:'id'
        },
        onUpdate:'CASCADE', // que hace cunado se actualiza
        onDeletee:'SET NULL' // que pasa si borro 
    },
}

class  OrderProduct extends Model {
    static assocciate() {
    
      }
    
      static config(sequelize) {
        return {
          sequelize,// conexion
          tableName: ORDER_PRODUCT_TABLE,// nombre de la tabla 
          modelName: 'OrderProduct',//nombre del modelo
          timestamps: false //empezar a crear campos por defectos 
        }
      }


}


module.exports = {OrderProduct,ORDER_PRODUCT_TABLE,OrderProductSchema};
