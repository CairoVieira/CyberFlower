const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true },
    tipo: { type: String, required: true, enum: ['Cartão', "Boleto"] },
    valor: { type: Number, required: true },
    data_hora: {type:Date, required: true}
})

module.exports = mongoose.model('Pagamento', esquema, 'pagamentos')