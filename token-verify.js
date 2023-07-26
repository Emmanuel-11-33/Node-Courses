/*Ejercicio de JWT */
const jwt = require('jsonwebtoken');

const secre = 'myapi'; // preferile en variable de entorno
const token = '';

function verifyTokeb (token,secre){
    return jwt.verify(token,secre);
}


const payload = verifyTokeb(token,secre);
console.log(payload);