import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantaService } from '../planta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-planta-form',
    templateUrl: './planta-form.component.html',
    styleUrls: ['./planta-form.component.scss']
})
export class PlantaFormComponent implements OnInit {

    title: string = 'Nova planta'

    planta: any = {}

    flores: any = [
        { valor: 'true', descr: 'Sim' },
        { valor: 'false', descr: 'Não' }
    ]

    plantadas: any = [
        { valor: 'true', descr: 'Sim' },
        { valor: 'false', descr: 'Não' }
    ]

    comestiveis: any = [
        { valor: 'true', descr: 'Sim' },
        { valor: 'false', descr: 'Não' }
    ]

    constructor(
        private plantaSrv: PlantaService,
        private snackBar: MatSnackBar,
        private location: Location,
        private actRoute: ActivatedRoute
    ) { }

    async ngOnInit() {
        if (this.actRoute.snapshot.params['id']) {
            try {
                this.planta = await this.plantaSrv.obterUm(this.actRoute.snapshot.params['id'])
                this.title = 'Editando Planta'
            }
            catch (erro) {
                console.log(erro)
                this.snackBar.open('ERRO: Não foi possível carregar os dados para edição.', 'Que pena!',
                    { duration: 5000 })
            }
        }
    }

    async salvar(form: NgForm) {
        try {
            if (form.valid) {
                if (this.planta._id) {
                    await this.plantaSrv.atualizar(this.planta)
                }
                else {
                    await this.plantaSrv.novo(this.planta)
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
