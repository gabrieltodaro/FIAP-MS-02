const jwt = require("jsonwebtoken");
const config = require("../config/settings");

function generateToken(id, usuario, email){
    return jwt.sign({idusuario: id, nomeusuario: usuario, email: email},
        config.jwt_secret,
        {expiresIn: config.jwt_expires});
}

module.exports = generateToken;