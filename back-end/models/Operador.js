const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true },
    nome: { type: String, required: true },
    login_email: {type: String, required: true, index: { unique: true} },
    senha: {type: Password, required: true}
})

module.exports = mongoose.model('Operador', esquema, 'operadores')