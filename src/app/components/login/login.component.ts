import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.sucessFullLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, () => {
      this.toast.error('Usuário e/ou senha incorreta!', 'Erro de Login');
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
