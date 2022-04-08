import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';


@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[]= [];

  constructor(private service: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(response=> {
      this.clientes = response;
      console.log(response);
    });
  }

  novoCadastro(){
    this.router.navigate(['/clientes-form']);
  }


}
