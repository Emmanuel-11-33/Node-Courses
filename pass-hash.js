/* Ejemplo de has */
const bcrypt=require('bcrypt');

async function hashPassword(){
    const mypassworf = 'andmin1234';
    const hash = await bcrypt.hash(mypassworf,10);
    console.log(hash);
}


hashPassword();





