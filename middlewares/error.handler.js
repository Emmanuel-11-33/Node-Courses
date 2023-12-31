////Para que siempre sean detectados como middle tiene que tener los 4 elementos 

const { ValidationError } = require("sequelize");
const boom = require('@hapi/boom');

// este caputrura el error y lo muestra 
function logErrors (err,req,res,next){
    console.log('logErrors')
    console.error(err);
    next(err); // middleware de tipo eror 
}

// hacer un taquin de errores investigar 

// este acaba con la peticion y envia estatus 
function erroHandler(err,req,res,next){
    console.log('errorHandler')
    res.status(500).json({
        message : err.message,
        stack: err.stack,
    })
}

//Funcion de error boom 
function boomHandler(err,req,res,next){
if (err.isBoom){ // si estipo boom 
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
}else {
// si no es tipo boom
next(err);
}

}

function ormErrorHandler(err,req,res,next){
    if (err instanceof ValidationError){
        res.status(409).json({
            statusCode:409,
            message:err.name,
            errors:err.errors
        });
    }
    next(err);

}


module.exports = {logErrors,erroHandler,boomHandler,ormErrorHandler}