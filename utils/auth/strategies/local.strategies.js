const {Strategy} = require('passport-local');


const AuthService= require('../../../services/auth.service');
const service = new AuthService();

const LocalStategy = new Strategy(
    {
        usernameField:'email',
        passwordField:'password'


},async (email,password,done) => {
try {
    const user = await service.getUser(email,password); 
    done(null,user);

} catch (error) {
    done(error,false) // si algo sale mal ejecuto don
}
});

module.exports = LocalStategy;