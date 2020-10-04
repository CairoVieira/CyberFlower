const mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')

const esquema = mongoose.Schema({
    codigo: { type: Number, required: true, index: { unique: true} },
    data_hora: {type:Date, required: true},
    item_pedido: [{type: mongoose.ObjectId, ref: 'Item_pedido', required: true}],
    valor_total: { type: Number, required: true, default: 0}
})

autoIncrement.initialize(mongoose.connection);
esquema.plugin(autoIncrement.plugin, { model: 'Pedido', field: 'codigo' });

module.exports = mongoose.model('Pedido', esquema, 'pedidos')