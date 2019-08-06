import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router, private store: Store<AppState>) { }

  events: string[] = [];
  opened = true;
  content = [];

  ngOnInit() {
    this.content = this.content;
    this.store.select('user').subscribe(user => {
      if (user.rol === 'Estudiante') {
        this.content = [{id: 1, name: 'Perfil', url: '/profile'}, {id: 2, name: 'Actividades', url: '/actividades'}];
      }
    });
  }

  logout() {
    this.tokenService.eraseToken();
    this.router.navigate(['login']);
  }
}
