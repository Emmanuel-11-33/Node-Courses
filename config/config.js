require('dotenv').config();

const config  ={
    env: process.env.NODE_ENV || 'dev',//
    port: process.env.PORT ||3000,//
    dbUser:  process.env.DB_USER,//
    dbPassword:  process.env.DB_PASSWORD,//
    dbHost:  process.env.DB_HOST,//
    dbName:  process.env.DB_NAME,//
    dbPort:  process.env.DB_PORT,//
    apiKey:process.env.API_KEY,
    // apiKey:'79922' ,
    jwtSecret:process.env.JWT_SECRET,
    mail :process.env.MAIL_USER,
    mailPassword:process.env.MAIL_PASSWORD,
}

module.exports = { config };