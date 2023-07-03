import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent {
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
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.finById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
      this.isAdminChecked = this.tecnico.perfis.includes('ADMIN');
      this.isClientChecked = this.tecnico.perfis.includes('CLIENTE');
      this.isTecnicChecked = this.tecnico.perfis.includes('TECNICO');
      this.tecnico.perfis = [];

      if (this.isAdminChecked) {
        this.tecnico.perfis.push('0');
      }
      if (this.isClientChecked) {
        this.tecnico.perfis.push('1');
      }
      if (this.isTecnicChecked) {
        this.tecnico.perfis.push('2');
      }
    })
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(() => {
      this.toastr.success('Técnico atualizado com sucesso', 'Update');
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
