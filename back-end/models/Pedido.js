const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true, index: { unique: true} },
    data_hora: {type:Date, required: true},
    item_pedido: [{type: mongoose.ObjectId, ref: 'Item_pedido', required: true}],
    valor_total: { type: Number, required: true, default: 0}
})

// esquema.plugin(AutoIncrement, {id:'codigo_seq',inc_field: 'codigo'})

module.exports = mongoose.model('Pedido', esquema, 'pedidos')