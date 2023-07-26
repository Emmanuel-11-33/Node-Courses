/* Midleware de autorisacion */

const boom = require('@hapi/boom');
const {config} = require('../config/config');

function checkApiKey(req,res,next){
    const apiKey = req.headers['api'];
    if(apiKey === config.apiKey ){
        next();
    }else{
        next(boom.unauthorized());
    }
}

/// version 1 solo checa el rol admin 
function checkAdminRole(req,res,next){
    const user = req.user;
    if (user.role === 'admin'){
        next();
    }else{
        next(boom.unauthorized());
    }
}


///version 2 checa multiples roles 
// uso de un closure 
function checkRoles(...roles){ //que roles tienen el permiso
    console.log(roles);
    return (req,res,next)=>{
        const user = req.user;
       // ['admin','seller']
        if (roles.includes(user.role)){
            next();
        }else{
            next(boom.unauthorized());
        }

    }
}



module.exports = {checkApiKey,checkAdminRole,checkRoles};