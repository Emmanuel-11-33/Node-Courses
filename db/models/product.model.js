const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';//nombre de la tabla que se crea

const ProductSchema={
    id: {
        allowNull: false, // no va ser nulo 
        autoIncrement: true, // va ir incrementando 
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name :{
        allowNull: false,
        type: DataTypes.STRING,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    description:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
      categoryId:{
        field :'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references :{
          model:CATEGORY_TABLE,
          key:'id'
        },
        onUpdate:'CASCADE', // que hace cunado se actualiza
        onDeletee:'SET NULL' // que pasa si borro 
      }
  
}

class Product extends Model {
    static assocciate(models) {
        this.belongsTo(models.Category, {as:'category'}); // nombre se la asociasion
      }
    
      static config(sequelize) {
        return {
          sequelize,// conexion
          tableName: PRODUCT_TABLE,// nombre de la tabla 
          modelName: 'Product',//nombre del modelo tiene qye ser igual a la clase
          timestamps: false //empezar a crear campos por defectos 
        }
      }


}


module.exports = {Product,PRODUCT_TABLE,ProductSchema};
