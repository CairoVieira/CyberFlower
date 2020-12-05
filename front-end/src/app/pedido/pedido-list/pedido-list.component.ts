import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {

  pedidos: any = []

  displayedColumns: string[] = ['codigo', 'item_pedido', 'data_hora', 'valor_total', 'excluir']

  constructor(
      private pedidoSrv: PedidoService,
      private snackBar: MatSnackBar
    ) { }

  async ngOnInit() {
      this.pedidos = await this.pedidoSrv.listar()
      console.log(this.pedidos)
  }

  async excluir (pedido: any) {
      console.log('111')
      if(confirm('Deseja realmente excluir este item?')) {
          try {
              let _pedido = {
                  _id: pedido._id,
                  item_pedido: []
              };

              pedido.item_pedido.forEach(item => _pedido.item_pedido.push(item._id));
              await this.pedidoSrv.excluir(_pedido)
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
