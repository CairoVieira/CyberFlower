const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required:true
    },
    flores: {
        type: Boolean,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    quantidade_regas: {
        type: Number,
        required: true
    },
    plantada: {
        type: Boolean,
        required: true
    },
    comestivel: {
        type: Boolean,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Planta', esquema, 'plantas')