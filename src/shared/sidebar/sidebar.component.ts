import { Component, OnInit } from '@angular/core';

import {TokenService} from '../../core/token.service';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router, private store: Store<{email: string, rol: string}>) { }

  events: string[] = [];
  opened = true;
  content = [];

  ngOnInit() {
    this.content = this.content;
    this.store.select('login').subscribe(login => {
      console.log(login);
      if (login.tokenInfo.rol === 'Estudiante') {
        this.content = [{id: 1, name: 'Perfil', url: '/perfil'}, {id: 2, name: 'Actividades', url: '/actividades'}];
      } else {
        this.content = [{id: 1, name: 'Perfil', url: '/perfil'}, {id: 2, name: 'Actividades Admin', url: '/actividades'}];
      }
    });
  }

  logout() {
    this.tokenService.eraseToken();
    this.router.navigate(['login']);
  }
}
