import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['chamados'])
  }

  logout(){
    this.router.navigate(['login']);
    this.authService.logout();
    this.toastr.info('Logout realizado com sucesso!', 'Logout', {timeOut: 7000})
  }

}
