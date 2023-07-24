const { Model, DataTypes, Sequelize } = require('sequelize');

const {CUSTUMER_TABLE} = require('./custumer.model');


const ORDER_TABLE = 'ordes';

const OrderSchema={
    id: {
        allowNull: false, // no va ser nulo 
        autoIncrement: true, // va ir incrementando 
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    customerId:{
            field :'customer_id',
            allowNull: false,
            type: DataTypes.INTEGER,
            references :{
              model:CUSTUMER_TABLE,
              key:'id'
            },
            onUpdate:'CASCADE', // que hace cunado se actualiza
            onDeletee:'SET NULL' // que pasa si borro 
    },// para este no nesesite correr una migracion poque ensi no es una colupna
    // campo calculado desde node, desde virtual
    // no recomendable  a mas capos de 50
    // lo mejor si son mas es una consulta typo scual
    total :{
      type:DataTypes.VIRTUAL,
      get(){
        if(this.items.length >0){ // este items des por la asociasion 
          return this.items.reduce((total,item)=>{
            return total + (item.price * item.OrderProduct.amount);
          },0);
        }
        return 0 ;
      }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
}

class Order extends Model {
    static assocciate(models) {
      
      this.belongsTo(models.Customer,{as:'customer'});// mode.nombre del modelo /ordenes ligadas a un cliente 
      this.belongsToMany(models.Product,{
        as:'items',
        through:models.OrderProduct, // la tabla que resolvera la relacion
        foreignKey:'orderId',
        otherKey:'productId',
      });
       
      }
    
      static config(sequelize) {
        return {
          sequelize,// conexion
          tableName: ORDER_TABLE,// nombre de la tabla 
          modelName: 'Order',//nombre del modelo
          timestamps: false //empezar a crear campos por defectos 
        }
      }


}


module.exports = {Order,ORDER_TABLE,OrderSchema};
