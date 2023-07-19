//modificar una existente
'use strict';
const {  DataTypes} = require('sequelize');
const { CUSTUMER_TABLE} = require('../models/custumer.model');
// aqui van los sigientes modelos solo en la 1 migracion


module.exports = {
  async up (queryInterface) { // parte dodne lo crea up 
    await queryInterface.changeColumn(CUSTUMER_TABLE,'user_id',{ // cambio de forma manual
      field :'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique:true,
    });
  },

  async down (queryInterface) {// para hacer cambios hacia atars 
   // await queryInterface.dropTable(CustomerSchema);
  }
};

