//crear tabla 
'use strict';

// aqui van los sigientes modelos solo en la 1 migracion
const {OrderSchema,ORDER_TABLE} = require('../models/order.model');


module.exports = {
  async up (queryInterface) { // parte dodne lo crea up 
    await queryInterface.createTable(ORDER_TABLE,OrderSchema);
  },

  async down (queryInterface) {// para hacer cambios hacia atars 
    await queryInterface.dropTable(ORDER_TABLE);
  }
};

