const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    tipo: { type: String, required: true, enum: ['Cartão de Crédito', 'Cartão de Débito'] },
    data_hora: {type:Date, required: true},
    pedido: {type: mongoose.ObjectId, ref: 'Pedido'}
})

module.exports = mongoose.model('Pagamento', esquema, 'pagamentos')