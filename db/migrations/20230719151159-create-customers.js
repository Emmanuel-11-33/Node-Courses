//crear tabla 
'use strict';

const {CustomerSchema, CUSTUMER_TABLE} = require('../models/custumer.model');
// aqui van los sigientes modelos solo en la 1 migracion


module.exports = {
  async up (queryInterface) { // parte dodne lo crea up 
    await queryInterface.createTable(CUSTUMER_TABLE,CustomerSchema);
  },

  async down (queryInterface) {// para hacer cambios hacia atars 
    await queryInterface.dropTable(CustomerSchema);
  }
};
