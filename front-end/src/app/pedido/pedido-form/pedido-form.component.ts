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

    plantas: any = []

    embalagens: any = []

    acessorios: any = []

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
            this.plantas = await this.plantaSrv.listar()
            this.embalagens = await this.embalagemSrv.listar()
            this.acessorios = await this.acessorioSrv.listar()

        }
        catch(erro) {
            console.log(erro)
                this.snackBar.open('ERRO: Não foi possível carregar os dados do formulário.', 'Que pena!',
                    { duration: 5000 })
        }
    }

    async salvar(form: NgForm) {
        try {
            if (form.valid) {
                if (this.pedido._id) {
                    await this.pedidoSrv.atualizar(this.pedido)
                }
                else {
                    await this.pedidoSrv.novo(this.pedido)
                }
                this.snackBar.open('Dados salvos com sucesso.', 'Entendi.',
                    { duration: 5000 })
                this.location.back
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

}
