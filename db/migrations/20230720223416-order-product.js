//crear tabla 
'use strict';

// aqui van los sigientes modelos solo en la 1 migracion
const {OrderProductSchema,ORDER_PRODUCT_TABLE} = require('../models/order-product.model');


module.exports = {
  async up (queryInterface) { // parte dodne lo crea up 
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchema);
  },

  async down (queryInterface) {// para hacer cambios hacia atars 
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};

