import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: []
  }

  isAdminChecked: boolean = false;
  isClientChecked: boolean = false;
  isTecnicChecked: boolean = false;

  nome: FormControl = new FormControl(null,
    [Validators.required,
    Validators.minLength(3)]);

  cpf: FormControl = new FormControl(null,
    [Validators.required,
    Validators.minLength(11)]);

  email: FormControl = new FormControl(null,
    Validators.email);

  senha: FormControl = new FormControl(null,
    Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.finById(this.cliente.id).subscribe(resposta =>{
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

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toastr.success('Cliente atualizado com sucesso', 'Update');
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

  addPerfil(perfil: any): void {
    if (perfil == 0) {
      if (this.isAdminChecked) {
        this.cliente.perfis.push('0');
      } else {
        this.cliente.perfis.splice(this.cliente.perfis.indexOf('0'), 1);
      }
    }

    if (perfil == 1) {
      if (this.isClientChecked) {
        this.cliente.perfis.push('1');
      } else {
        this.cliente.perfis.splice(this.cliente.perfis.indexOf('1'), 1);
      }
    }

    if (perfil == 2) {
      if (this.isTecnicChecked) {
        this.cliente.perfis.push('2');
      } else {
        this.cliente.perfis.splice(this.cliente.perfis.indexOf('2'), 1);
      }
    }
  }

  validaCampos(): boolean {
    return this.nome.valid
      && this.senha.valid
      && this.email.valid
      && this.cpf.valid;
  }

}
