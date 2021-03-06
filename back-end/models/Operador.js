const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: { type: String, required: true },
    login_email: {type: String, required: true, index: { unique: true} },
    senha: {type: String, required: true}
})

module.exports = mongoose.model('Operador', esquema, 'operadores')