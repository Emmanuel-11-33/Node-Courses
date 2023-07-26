const express =require('express');

const cores = require('cors');

const routerApi = require('./routes');
const {logErrors, erroHandler,boomHandler, ormErrorHandler} = require('./middlewares/error.handler')

const {checkApiKey} = require('./middlewares/aunt.handler');

const app  = express();
const port = 3311;

app.use(express.json());

/////////////////cores 
const whitelist = ['http://localhost:8080',];
const options ={
    origin:(origin, callback)=>{
        if(whitelist.includes(origin) || !origin){//
            callback(null,true);
        }else{
            callback(new Error('No permitido'));
        }
    }

};
app.use(cores(options));

require('./utils/auth');// importo la estrategi de auth

app.get('/ruta-protegida', checkApiKey, (req,res)=>{
    res.send('Ruta protegida');
});

routerApi(app);

//////////////////
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomHandler);
app.use(erroHandler); // este tiene que ser el ultimo porque no tiene next
///////////////////

//todo lo espesifico tiene que ir antes que lo dinamico (espesifico seria un ruta en conqureta sin parametros )


app.listen(port, ()=>{
    console.log('run on port' + port);
});