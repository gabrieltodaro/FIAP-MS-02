const mongoose = require("../database/connection");

const schema = new mongoose.Schema({
    nome_banco:{type: String, require: true},
    tipo_conta:{type: String, require: true},
    nome_titular:{type: String, require: true},
    limite_cartao: Number,
    email:{type: String, require: true},
    apikey:{type: String, require: true}
});

const Account = mongoose.model("Conta", schema);

module.exports = Account;