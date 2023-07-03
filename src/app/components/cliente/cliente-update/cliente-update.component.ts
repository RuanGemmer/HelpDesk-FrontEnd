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
    perfis: [],
    dataCriacao: ''
  }

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
      resposta.perfis = [];
      this.cliente = resposta;
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
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid
      && this.senha.valid
      && this.email.valid
      && this.cpf.valid;
  }

}
