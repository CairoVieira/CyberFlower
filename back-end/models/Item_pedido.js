const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    planta: {type: mongoose.ObjectId, ref: 'Planta'},
    quantidade_planta: {type: Number, default: 0},
    embalagem: {type: mongoose.ObjectId, ref: 'Embalagem'},
    quantidade_embalagem: {type: Number, default: 0},
    acessorio: {type: mongoose.ObjectId, ref: 'Acessorio'},
    quantidade_acessorio: {type: Number, default: 0},
    valor_total_item: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('Item_pedido', esquema, 'itens_pedido')