import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service'

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {
  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastr.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

}