//agregar colupna
'use strict';

const {UserSchema, USER_TABLE} = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE,'role',UserSchema.role);
    // aqui irian los nuevos cambios que se arian en este update de tablas
 
  },

  async down (queryInterface) {
    await queryInterface.removeColum(USER_TABLE,'role');

  }
};
