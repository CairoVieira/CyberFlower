const Pedido = require('../models/Pedido')
const item_pedido = require('./item_pedido')
const pagamento = require('./pagamento')

const controller = {}

controller.novo = async (req, res) => {
    try {
        let pedido = {
            codigo: req.body.codigo,
            data_hora: req.body.data_hora,
            valor_total: req.body.valor_total,
            item_pedido: []
        }

        await Promise.all(req.body.item_pedido.map(async (item) => {
            const r = {
                body: item
            }
            const id = await item_pedido.novo(r, res)
            pedido.item_pedido.push(id)
        }))

        const item = await Pedido.create(pedido)
        const id_pedido = item.id

        let pag = {
            body: {
                data_hora: new Date().toJSON(),
                status: 'Processando',
                pedido: id_pedido,
                tipo: req.body.pagamento.tipo
            }
        }

        await pagamento.novo(pag, res)

        res.status(201).end()
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try {
        let dados = await Pedido.find({})
            .populate({
                path: 'item_pedido',
                populate: {
                    path: 'planta',
                    model: 'Planta'
                }
            })
            .populate({
                path: 'item_pedido',
                populate: {
                    path: 'embalagem',
                    model: 'Embalagem'
                }
            })
            .populate({
                path: 'item_pedido',
                populate: {
                    path: 'acessorio',
                    model: 'Acessorio'
                }
            })
          
        res.send(dados)

  
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    const id = req.params.id
    let obj = await Pedido.findById(id).populate({
        path: 'item_pedido',
        populate: {
            path: 'planta',
            model: 'Planta'
        }
    })
    .populate({
        path: 'item_pedido',
        populate: {
            path: 'embalagem',
            model: 'Embalagem'
        }
    })
    .populate({
        path: 'item_pedido',
        populate: {
            path: 'acessorio',
            model: 'Acessorio'
        }
    })

    if (obj) res.send(obj)
    else res.status(404).end()

}

// Não há necessidade de atualização pois o pedido só será criado, listado ou excluído
/*controller.atualizar = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Pedido.findByIdAndUpdate(id, req.body)

        if (obj) res.status(204).end()
        else res.status(404).end()
    }
    catch (erro) {
        console.error(erro)
        res.status(500).end()
    }
}*/

controller.excluir = async (req, res) => {
    try {

        await Promise.all(req.body.item_pedido.map(async (item) => {
            const r = {
                body: item
            }
            await item_pedido.excluir(r, res)
        }))
        .then (async result => {
            const id = req.body._id
            let obj = await Pedido.findByIdAndDelete(id)
    
            if(obj) res.status(204).end()
            else res.status(404).end()
        })
        .catch(erro => res.status(500).send(erro)) 
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}

module.exports = controller