const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: {type: Number, required: true, index: { unique: true} },
    tipo: { type: String, required: true},
    cor: {type: String, required: true},
    tamanho: {type: String, required: true, enum: ['P', 'M', 'G', 'U']},
    quantidade: {type: Number, required: true},
    valor: {type: Number, required: true}
})

module.exports = mongoose.model('Embalagem', esquema, 'embalagens')