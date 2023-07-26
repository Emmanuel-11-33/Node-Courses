/* Ejemplo de has */
const bcrypt=require('bcrypt');

async function verifyPassword(){
    const mypassworf = 'andmin1234';
    const hash = '';
    const isMach = await bcrypt.compare(mypassworf,hash );
    console.log(isMach);
}


verifyPassword();


