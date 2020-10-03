const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true },
    itens_pedido: [{ type: String, required: true}],
    valor: { type: Number, required: true },
    data_hora: {type:Date, required: true}
})

module.exports = mongoose.model('Pedido', esquema, 'pedidos')