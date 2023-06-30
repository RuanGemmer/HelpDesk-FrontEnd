import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

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

  validaCampos(): boolean {
    return this.nome.valid
      && this.senha.valid
      && this.email.valid
      && this.cpf.valid;
  }

}
