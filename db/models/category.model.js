const { Model, DataTypes, Sequelize } = require('sequelize');


const CATEGORY_TABLE = 'categories';//nombre de la tabla que se crea

const CategorySchema={
    id: {
        allowNull: false, // no va ser nulo 
        autoIncrement: true, // va ir incrementando 
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name :{
        allowNull: false,
        unique:true,
        type: DataTypes.STRING,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
}

class Category extends Model {
    static assocciate(models) {
        this.hasMany(models.Product,{
            as:'products', // llamamos la asociacion con el nombre clabe de 
            foreignKey:'categoryId' //que esta relacioanda a 
        });
      }
    
      static config(sequelize) {
        return {
          sequelize,// conexion
          tableName: CATEGORY_TABLE,// nombre de la tabla 
          modelName: 'Category',//nombre del modelo
          timestamps: false //empezar a crear campos por defectos 
        }
      }


}


module.exports = {Category,CATEGORY_TABLE,CategorySchema};
