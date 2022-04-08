import { HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { nextTick } from 'process';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit{

  cliente: Cliente;
  success: boolean = false;
  errors: string[];
  id:number;

  constructor(private clientesService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();

  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id){
     this.clientesService.findById(this.id)
     .subscribe(response =>
      this.cliente = response,
      erroResponse => this.cliente = new Cliente()
      )
    }
  }



  onSubmit(){
    if(!this.id){
      this.save();
    }

    if(this.id){
      this.update()
    }


  }

  save(){
    this.clientesService.salvar(this.cliente).subscribe(response => {
      this.cliente = response;
      this.success = true;
      this.errors = null;
    },
      errorResponse=>{
        this.errors = errorResponse.error.erros;
        this.success = false;

      });
  }

  update(){
    this.clientesService.update(this.cliente)
    .subscribe(Response=>{
      this.success = true;
      this.errors = null;
    }, errorResponse=>{
      this.errors = ['Erro ao atualizar o cliente ']
      this.success = false;

    });
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes-list']);

  }

}
