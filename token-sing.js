/*Ejercicio de JWT */
const jwt = require('jsonwebtoken');

const secre = 'myapi'; // preferile en variable de entorno
const payload = {
    sub:1, // forma de idetificar el usuario
    role:'customer' // permisos
}

function signTokeb (payload,secre){
    return jwt.sign(payload,secre);
}


const token = signTokeb(payload,secre);
console.log(token);