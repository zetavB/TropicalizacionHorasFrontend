import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  events: string[] = [];
  opened = true;
  content = [
    { id: 11, name: 'Perfil', url: '/profile' },
    { id: 12, name: 'Cerrar sesión' , url: '/login'}
  ];

  ngOnInit() {
    this.content = this.content;
  }
}
