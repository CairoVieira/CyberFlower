import { Component, OnInit } from '@angular/core';
import { PlantaService } from '../planta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-planta-list',
  templateUrl: './planta-list.component.html',
  styleUrls: ['./planta-list.component.scss']
})
export class PlantaListComponent implements OnInit {

  plantas: any = []

  displayedColumns: string[] = ['codigo', 'nome', 'flores', 'cor', 'quantidade_regas', 'plantada', 'comestivel', 'quantidade', 'valor', 'editar', 'excluir']

  constructor(
      private plantaSrv: PlantaService,
      private snackBar: MatSnackBar
    ) { }

  async ngOnInit() {
      this.plantas = await this.plantaSrv.listar()
      console.log(this.plantas)
  }

  async excluir (id: string) {
      if(confirm('Deseja realmente excluir este item?')) {
          try {
              await this.plantaSrv.excluir(id)
              this.ngOnInit()
              this.snackBar.open('Item excluído com sucesso.', 'Entendi.', {
              duration: 5000,
              })
            }
          catch(erro) {
              console.error(erro)
              this.snackBar.open('ERRO: Não foi possível excluir este item.', 'Que pena!.', {
              duration: 5000,
              })
            }
      }
  }



}
