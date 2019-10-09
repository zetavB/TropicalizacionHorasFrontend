import {Component, OnInit} from '@angular/core';

import {TokenService} from '../../../core/token.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Logout} from '../../../features/login/state/login.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router, private store: Store<{ email: string, rol: string }>) {
  }

  content = [];

  ngOnInit() {
    this.store.select('login').subscribe(login => {
      if (login.tokenInfo != null && login.tokenInfo.rol === 'Estudiante') {
        this.content = [
          {id: 1, name: 'Perfil', url: '/perfil'},
          {id: 2, name: 'Actividades', url: '/actividades'},
          {id: 2, name: 'Proyectos', url: '/proyectos'},
        ];
      } else {
        this.content = [
          {id: 1, name: 'Perfil', url: '/perfil'},
          {id: 2, name: 'Actividades Admin', url: '/actividades'},
          {id: 3, name: 'Proyectos', url: '/proyectos'},
          {id: 4, name: 'Categorías', url: '/categorias'},
          {id: 5, name: 'Usuarios', url: '/usuarios'}
        ];
      }
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
