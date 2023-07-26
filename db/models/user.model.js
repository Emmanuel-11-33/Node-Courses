const { Model, DataTypes, Sequelize } = require('sequelize');


const USER_TABLE = 'users'; // nombre de la tabla que se creara 

const UserSchema = {
  id: {
    allowNull: false, // no va ser nulo 
    autoIncrement: true, // va ir incrementando 
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING, // va ser de tipo string
    unique: true, // tiene que ser unico 
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken:{
    field:'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer' // valor por defecto
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // nombre de la colupna 
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static assocciate(models) {
    this.hasOne(models.Customer,{
      as: 'customer',
      foreignKey:'userId'
    }); // con esto consigo que usert tambien pueda acceder a customer bidireccional 

    // associate
  }

  static config(sequelize) {
    return {
      sequelize,// conexion
      tableName: USER_TABLE,// nombre de la tabla 
      modelName: 'User',//nombre del modelo
      timestamps: false //empezar a crear campos por defectos 
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }