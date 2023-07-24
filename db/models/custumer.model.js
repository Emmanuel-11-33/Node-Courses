const { Model, DataTypes, Sequelize } = require('sequelize');
const {USER_TABLE} =require('./user.model');

const CUSTUMER_TABLE = 'customers';


const CustomerSchema = {
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
    lastName:{
        allowNull: false,
        type: DataTypes.STRING,
        field:'last_name',
    },
    phone:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
    userId:{
      field :'user_id', // nombre de la colupna 
      allowNull: false,
      type: DataTypes.INTEGER,
      unique:true,
      references :{
        model:USER_TABLE,
        key:'id'
      },
      onUpdate:'CASCADE', // que hace cunado se actualiza
      onDeletee:'SET NULL' // que pasa si borro 
    }
}

class Customer extends Model {
    static assocciate(models) {
        this.belongsTo(models.User, {as:'user'});
        this.hasMany(models.Order,{as:'orders',foreignKey:'customerId'}); // un cliente puede tener muchas ordens
      }
    
      static config(sequelize) {
        return {
          sequelize,// conexion
          tableName: CUSTUMER_TABLE,// nombre de la tabla 
          modelName: 'Customer',//nombre del modelo
          timestamps: false //empezar a crear campos por defectos 
        }
      }


}


module.exports = {CUSTUMER_TABLE,CustomerSchema,Customer};