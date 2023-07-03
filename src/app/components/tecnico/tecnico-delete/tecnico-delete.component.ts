import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: []
  }

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isAdminChecked: boolean = false;
  isClientChecked: boolean = false;
  isTecnicChecked: boolean = false;

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.finById(this.tecnico.id).subscribe(resposta =>{
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

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toastr.success('Técnico excluído com sucesso', 'Delete');
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

}