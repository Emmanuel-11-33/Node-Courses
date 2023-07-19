//Crear tablas
'use strict';

const {UserSchema, USER_TABLE} = require('../models/user.model');
// aqui van los sigientes modelos solo en la 1 migracion


module.exports = {
  async up (queryInterface) { // parte dodne lo crea up 
    await queryInterface.createTable(USER_TABLE,UserSchema);
  },

  async down (queryInterface) {// para hacer cambios hacia atars 
    await queryInterface.dropTable(USER_TABLE);
  }
};
