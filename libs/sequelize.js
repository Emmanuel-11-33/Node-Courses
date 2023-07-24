//configuracion para mandar parametros a la base de datos 
//ORM = Un ORM es un modelo de programación que permite mapear las estructuras de una base de datos relacionales.
const {Sequelize } = require('sequelize');

const {config} = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{
    dialect:'postgres',
    logging: true, // cada ves que se haga la consulta me motrara el comando squel
});

setupModels(sequelize);

//sequelize.sync();//el toma los modelso y crea la tabla es mu ydelicado y no se aconseja en produccion


module.exports = sequelize;