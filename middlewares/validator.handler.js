
const boom = require('@hapi/boom');
// con esto creo midleweares de forma dinamica
// con el uso de closures
function validatosHandler (schema,property){
    return (req,res,next) =>{
        const data = req[property];
        const {error} = schema.validate(data,{abortEarly:false});
        if (error){
           next ( boom.badRequest(error));
        }
        next();
    }
}


module.exports = validatosHandler;