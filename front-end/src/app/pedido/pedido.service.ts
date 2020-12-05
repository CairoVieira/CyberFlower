import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    private server = environment.apiServer
    private apiUri = this.server + 'pedido'

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get(this.apiUri).toPromise()
    }

    excluir(pedido: object) {
        return this.http.request('DELETE', this.apiUri, { body: pedido }).toPromise()
    }

    novo(body: any) {
        return this.http.post(this.apiUri, body).toPromise()
    }

    obterUm(id: string) {
        return this.http.get(this.apiUri + '/' + id).toPromise()
    }

    atualizar(body: any) {
        return this.http.put(this.apiUri, body).toPromise()
    }
}