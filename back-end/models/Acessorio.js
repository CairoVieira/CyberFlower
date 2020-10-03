const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true },
    nome: { type: String, required: true},
    tipo: { type: String, required: true},
    cor: {type: String},
    quantidade: { type: Number, required: true},
    valor: { type: Number, required: true }
})

module.exports = mongoose.model('Acessorio', esquema, 'acessorios')