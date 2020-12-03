import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlantaService {

    private server = environment.apiServer

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get(this.server + 'planta').toPromise()
    }
}
