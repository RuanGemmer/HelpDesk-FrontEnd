import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: []
  }

  isAdminChecked: boolean = false;
  isClientChecked: boolean = false;
  isTecnicChecked: boolean = true;

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
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tecnico.perfis = ['2'];
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(() => {
      this.toastr.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos'])
      
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
        this.tecnico.perfis.push('0');
      } else {
        this.tecnico.perfis.splice(this.tecnico.perfis.indexOf('0'), 1);
      }
    }

    if (perfil == 1) {
      if (this.isClientChecked) {
        this.tecnico.perfis.push('1');
      } else {
        this.tecnico.perfis.splice(this.tecnico.perfis.indexOf('1'), 1);
      }
    }

    if (perfil == 2) {
      if (this.isTecnicChecked) {
        this.tecnico.perfis.push('2');
      } else {
        this.tecnico.perfis.splice(this.tecnico.perfis.indexOf('2'), 1);
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
