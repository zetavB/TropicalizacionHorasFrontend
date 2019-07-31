import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  events: string[] = [];
  opened = true;
  content = [
    { id: 11, name: 'Perfil', url: '/profile' }
  ];

  ngOnInit() {
    this.content = this.content;
  }

  logout() {
    this.tokenService.eraseToken();
    this.router.navigate(['login']);
  }
}
