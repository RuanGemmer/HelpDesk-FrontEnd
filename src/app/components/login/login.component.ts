import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  creds: credenciais = {
    email: '',
    senha: ''
  }

  constructor(private toast: ToastrService){}

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

logar(){
  this.toast.error('Usuário e/ou Senha inválido(s)!', 'Erro de Login');
  this.creds.senha = '';
}

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }
}
