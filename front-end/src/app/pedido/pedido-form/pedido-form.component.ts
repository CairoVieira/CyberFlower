import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PedidoService } from '../pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlantaService } from 'src/app/planta/planta.service';
import { EmbalagemService } from 'src/app/embalagem/embalagem.service';
import { AcessorioService } from 'src/app/acessorio/acessorio.service';

@Component({
    selector: 'app-pedido-form',
    templateUrl: './pedido-form.component.html',
    styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {

    title: string = 'Novo pedido'

    pedido: any = {}

    flores: any = [
        { valor: 'true', descr: 'Sim' },
        { valor: 'false', descr: 'Não' }
    ]

    pedidodas: any = [
        { valor: 'true', descr: 'Sim' },
        { valor: 'false', descr: 'Não' }
    ]

    comestiveis: any = [
        { valor: 'true', descr: 'Sim' },
        { valor: 'false', descr: 'Não' }
    ]

    plantas: any = [{
        _id: -1,
        nome: "Nenhum",
    }]
    qtdPlantas: number = 0
    plantasQuantidade: number = -1;

    embalagens: any = [{
        _id: -1,
        tipo: "Nenhum",
    }]
    qtdEmbalagens: number = 0
    embalagensQuantidade: number = -1;

    acessorios: any = [{
        _id: -1,
        nome: "Nenhum",
    }]
    qtdAcessorios: number = 0
    acessoriosQuantidade: number = -1;

    pagamentos: any = [
        { tipo: "Cartão de Débito" },
        { tipo: "Cartão de Crédito" }
    ]

    constructor(
        private pedidoSrv: PedidoService,
        private plantaSrv: PlantaService,
        private embalagemSrv: EmbalagemService,
        private acessorioSrv: AcessorioService,
        private snackBar: MatSnackBar,
        private location: Location,
        private actRoute: ActivatedRoute
    ) { }

    async ngOnInit() {
        if (this.actRoute.snapshot.params['id']) {
            try {
                this.pedido = await this.pedidoSrv.obterUm(this.actRoute.snapshot.params['id'])
                this.title = 'Editando Pedido'
            }
            catch (erro) {
                console.log(erro)
                this.snackBar.open('ERRO: Não foi possível carregar os dados para edição.', 'Que pena!',
                    { duration: 5000 })
            }
        }

        try {
            this.plantas = this.plantas.concat(await this.plantaSrv.listar())
            this.embalagens = this.embalagens.concat(await this.embalagemSrv.listar())
            this.acessorios = this.acessorios.concat(await this.acessorioSrv.listar())

        }
        catch (erro) {
            console.log(erro)
            this.snackBar.open('ERRO: Não foi possível carregar os dados do formulário.', 'Que pena!',
                { duration: 5000 })
        }
    }

    async salvar(form: NgForm) {
        try {
            if (form.valid) {
                let selectedPlanta = this.plantas.find(x => x._id === form.form.value.planta)
                let valorPlanta = selectedPlanta._id !== -1 ? selectedPlanta.valor * form.form.value.quantidadePlanta : 0
                let selectedEmbalagem = this.embalagens.find(x => x._id === form.form.value.embalagem)
                let valorEmbalagem = selectedEmbalagem._id !== -1 ? selectedEmbalagem.valor * form.form.value.quantidadeEmbalagem : 0
                let selectedAcessorio = this.acessorios.find(x => x._id === form.form.value.acessorio)
                let valorAcessorio = selectedAcessorio._id !== -1 ? selectedAcessorio.valor * form.form.value.quantidadeAcessorio : 0

                let valor_total = valorPlanta + valorEmbalagem + valorAcessorio
                let item_pedido = {}

                if (selectedPlanta._id !== -1 && selectedEmbalagem._id !== -1 && selectedAcessorio._id !== -1) {
                    item_pedido = {
                        planta: selectedPlanta._id,
                        acessorio: selectedAcessorio._id,
                        embalagem: selectedEmbalagem._id,
                        quantidade_planta: form.form.value.quantidadePlanta,
                        quantidade_acessorio: form.form.value.quantidadeAcessorio,
                        quantidade_embalagem: form.form.value.quantidadeEmbalagem,
                        valor_total_item: valor_total
                    }
                }
                if (selectedPlanta._id == -1 && selectedEmbalagem._id !== -1 && selectedAcessorio._id !== -1) {
                    item_pedido = {
                        acessorio: selectedAcessorio._id,
                        embalagem: selectedEmbalagem._id,
                        quantidade_acessorio: form.form.value.quantidadeAcessorio,
                        quantidade_embalagem: form.form.value.quantidadeEmbalagem,
                        valor_total_item: (selectedAcessorio.valor * form.form.value.quantidadeAcessorio) + (selectedEmbalagem.valor * form.form.value.quantidadeEmbalagem)
                    }
                }
                if (selectedPlanta._id !== -1 && selectedEmbalagem._id == -1 && selectedAcessorio._id !== -1) {
                    item_pedido = {
                        planta: selectedPlanta._id,
                        acessorio: selectedAcessorio._id,
                        quantidade_planta: form.form.value.quantidadePlanta,
                        quantidade_acessorio: form.form.value.quantidadeAcessorio,
                        valor_total_item: (selectedAcessorio.valor * form.form.value.quantidadeAcessorio) + (selectedPlanta.valor * form.form.value.quantidadePlanta)
                    }
                }
                if (selectedPlanta._id !== -1 && selectedEmbalagem._id !== -1 && selectedAcessorio._id == -1) {
                    item_pedido = {
                        planta: selectedPlanta._id,
                        embalagem: selectedEmbalagem._id,
                        quantidade_planta: form.form.value.quantidadePlanta,
                        quantidade_embalagem: form.form.value.quantidadeEmbalagem,
                        valor_total_item: (selectedPlanta.valor * form.form.value.quantidadePlanta) + (selectedEmbalagem.valor * form.form.value.quantidadeEmbalagem)
                    }
                }
                if (selectedPlanta._id !== -1 && selectedEmbalagem._id == -1 && selectedAcessorio._id == -1) {
                    item_pedido = {
                        planta: selectedPlanta._id,
                        quantidade_planta: form.form.value.quantidadePlanta,
                        valor_total_item: (selectedPlanta.valor * form.form.value.quantidadePlanta)
                    }
                }
                if (selectedPlanta._id == -1 && selectedEmbalagem._id !== -1 && selectedAcessorio._id == -1) {
                    item_pedido = {
                        embalagem: selectedEmbalagem._id,
                        quantidade_embalagem: form.form.value.quantidadeEmbalagem,
                        valor_total_item: (selectedEmbalagem.valor * form.form.value.quantidadeEmbalagem)
                    }
                }
                if (selectedPlanta._id == -1 && selectedEmbalagem._id == -1 && selectedAcessorio._id !== -1) {
                    item_pedido = {
                        acessorio: selectedAcessorio._id,
                        quantidade_acessorio: form.form.value.quantidadeAcessorio,
                        valor_total_item: (selectedAcessorio.valor * form.form.value.quantidadeAcessorio)
                    }
                }

                let pedido = {
                    data_hora: new Date().toISOString(),
                    valor_total: valor_total,
                    pagamento: {
                        tipo: form.form.value.pagamento
                    },
                    item_pedido: [
                        item_pedido
                    ]
                }

                console.log("PEDIDO", pedido)
                if (this.pedido._id) {
                    await this.pedidoSrv.atualizar(pedido)
                }
                else {
                    await this.pedidoSrv.novo(pedido)
                }
                this.snackBar.open('Dados salvos com sucesso.', 'Entendi.',
                    { duration: 5000 })
                this.location.back()
            }

        }
        catch (erro) {
            console.log(erro)
            this.snackBar.open('ERRP: Não foi possível salvar os dados.', 'Que pena!',
                { duration: 5000 })
        }
    }

    voltar(form: NgForm) {
        let result = true
        if (form.dirty && form.touched) {
            result = confirm('Há dados não salvos. Deseja realmente voltar?')
        }
        if (result) this.location.back()
    }

    getMaxValuePlantas(planta) {
        if (planta == -1) {
            this.plantasQuantidade = planta
        } else {
            let selectedItem = this.plantas.find(x => x._id === planta)
            this.plantasQuantidade = selectedItem.quantidade
        }
    }

    getMaxValueEmbalagem(embalagem) {
        if (embalagem == -1) {
            this.embalagensQuantidade = embalagem
        } else {
            let selectedItem = this.embalagens.find(x => x._id === embalagem)
            this.embalagensQuantidade = selectedItem.quantidade
        }
    }

    getMaxValueAcessorio(acessorio) {
        if (acessorio == -1) {
            this.acessoriosQuantidade = acessorio
        } else {
            let selectedItem = this.acessorios.find(x => x._id === acessorio)
            this.acessoriosQuantidade = selectedItem.quantidade
        }
    }
}
