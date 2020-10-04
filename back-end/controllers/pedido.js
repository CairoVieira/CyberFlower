const Pedido = require('../models/Pedido')
const item_pedido = require('./item_pedido')

const controller = {}

controller.novo = async (req, res) => {
    try {
        console.log("1.0- ")
        req.body.item_pedido.forEach(item => {
            const r = {
                body: item
            }
            console.log("1.1- ")
            item_pedido.novo(r, res)
            console.log("1.2- ")
        });
        //console.log("1.0- ", req.body)
        //await Pedido.create(req.body)
        res.status(201).end()
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try {
        let dados = await Pedido.find()
            .populate('item_pedido')
        res.send(dados)
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    const id = req.params.id
    let obj = await Pedido.findById(id)

    if (obj) res.send(obj)
    else res.status(404).end()

}

controller.atualizar = async (req, res) => {
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
}

controller.excluir = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Pedido.findByIdAndDelete(id)

        if(obj) res.status(204).end()
        else res.status(404).end()
    }
    catch (erro) {
        console.error(erro)
        res.status(500).send(erro)
    }
}

module.exports = controller