const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const {config} = require('../config/config');

const UserService= require('./user.service');
const service = new UserService();



class AuthService {


    async getUser(email,password){
        const user = await service.findbyEmail(email); 
        if(!user){
            throw boom.unauthorized(); // esto si no rencuetra un usuario con ese email
        }
     
        const isMach = await bcrypt.compare(password,user.password);
        if(!isMach){
            throw boom.unauthorized() // si la contrasenna noo coside 
        }
    
        // si todo salio bieen 
        delete user.dataValues.password;
        return user;
    }

     singToken(user){
        const payload = {
            sub:user.id,
            role:user.role,
        }
        const token = jwt.sign(payload,config.jwtSecret);
        return {user,token};
    }


    async sendRecovery(email){
        const user = await service.findbyEmail(email)
        if(!user){
            throw boom.unauthorized(); // esto si no rencuetra un usuario con ese email
        } /// checar si findemail no haces la validacion par quitarlo
        const payload = {sub: user.id};
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});// lo ideal es cargar otro token para recuperasion
        const link = `http://myfrontend.com/recovery?token=${token} `;
        await service.update(user.id, {recoveryToken: token});
        const mail = {
            from: config.mailPassword, // sender address
            to: `${user.email}` , // list of receivers
            subject: "Recuperar contrasena", // Subject line
            html: `<b>Ingresa a esta URL => ${link} </b>`, // html body
        }
        const rta = await this.sendMail(mail);
        return rta;

    }

    async sendMail(infoMail){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure:true,
            port: 465,
            auth: {
                user: config.mail,
                pass: config.mailPassword // variable de entorno 
            }
        });
        await transporter.sendMail(infoMail);
          return {message:'mail sent'};

    }


    async changePassword(token, newPassword) {
        try {
          const payload = jwt.verify(token, config.jwtSecret);
          const user = await service.fineOne(payload.sub);
          if (user.recoveryToken !== token) {
            throw boom.unauthorized();
          }
          const hash = await bcrypt.hash(newPassword, 10);
          await service.update(user.id, {recoveryToken: null, password: hash});
          return { message: 'password changed' };
        } catch (error) {
          throw boom.unauthorized();
        }
      }

}

module.exports = AuthService;

/*


{
            from: config.mailPassword, // sender address
            to: `${user.email}` , // list of receivers
            subject: "Correo de prueva", // Subject line
            text: "Hello world", // plain text body
            html: "<b>Hello world?</b>", // html body
          }

*/