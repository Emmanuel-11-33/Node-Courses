//crear tabla 
'use strict';

// aqui van los sigientes modelos solo en la 1 migracion
const {CategorySchema,CATEGORY_TABLE} = require('../models/category.model');
const {ProductSchema,PRODUCT_TABLE} = require('../models/product.model');


module.exports = {
  async up (queryInterface) { // parte dodne lo crea up 
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
  },

  async down (queryInterface) {// para hacer cambios hacia atars 
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
