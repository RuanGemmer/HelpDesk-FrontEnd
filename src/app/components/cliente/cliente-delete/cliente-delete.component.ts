import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: []
  }

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isAdminChecked: boolean = false;
  isClientChecked: boolean = false;
  isTecnicChecked: boolean = false;

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.finById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
      this.isAdminChecked = this.cliente.perfis.includes('ADMIN');
      this.isClientChecked = this.cliente.perfis.includes('CLIENTE');
      this.isTecnicChecked = this.cliente.perfis.includes('TECNICO');
      this.cliente.perfis = [];

      if (this.isAdminChecked) {
        this.cliente.perfis.push('0');
      }
      if (this.isClientChecked) {
        this.cliente.perfis.push('1');
      }
      if (this.isTecnicChecked) {
        this.cliente.perfis.push('2');
      }
    })
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toastr.success('Cliente excluído com sucesso', 'Delete');
      this.router.navigate(['clientes'])

    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    })
  }

}