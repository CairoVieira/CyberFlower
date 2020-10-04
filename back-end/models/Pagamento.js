const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true, index: { unique: true} },
    tipo: { type: String, required: true, enum: ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'] },
    valor: { type: Number, required: true },
    data_hora: {type:Date, required: true}
})

module.exports = mongoose.model('Pagamento', esquema, 'pagamentos')