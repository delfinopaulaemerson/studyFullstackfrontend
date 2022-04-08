import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from './clientes/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private http: HttpClient) { }

  salvar(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>('http://localhost:8080/cliente',cliente);
  }

  update(cliente:Cliente):Observable<any>{
    let id  = String(cliente.id);
    let url = 'http://localhost:8080/cliente/'+id;
    return this.http.put<Cliente>(url, cliente);
  }

  findAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8080/cliente');
  }

  findById(id: number):Observable<Cliente>{
    return this.http.get<any>('http://localhost:8080/cliente/'+id);
  }




}
