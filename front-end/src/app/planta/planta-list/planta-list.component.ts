import { Component, OnInit } from '@angular/core';
import { PlantaService } from '../planta.service';

@Component({
  selector: 'app-planta-list',
  templateUrl: './planta-list.component.html',
  styleUrls: ['./planta-list.component.scss']
})
export class PlantaListComponent implements OnInit {

  plantas: any = []

  displayedColumns: string[] = ['codigo', 'nome', 'flores', 'cor', 'quantidade_regas', 'plantada', 'comestivel', 'quantidade', 'valor', 'editar', 'excluir']

  constructor(private plantaSrv: PlantaService) { }

  async ngOnInit() {
      this.plantas = await this.plantaSrv.listar()
      console.log(this.plantas)
  }

}
