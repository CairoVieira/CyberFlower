const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: {type: Number, required: true },
    tipo: { type: String, required: true},
    cor: {type: String, required: true},
    tamanho: {type: String, required: true, enum: ['P', 'M', 'G']},
    quantidade: {type: Number, required: true},
    valor: {type: Number, required: true, default: 2.5}
})

module.exports = mongoose.model('Embalagem', esquema, 'embalagens')