import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  isSmallScreen: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.toastr.info('Logout realizado com sucesso!', 'Logout', { timeOut: 7000 })
  }

  navigateAndClose(link: string): void {
    this.router.navigate([link]).then(() => {
      if (this.isSmallScreen) {
        this.drawer.close();
      }
    });
  }
}
