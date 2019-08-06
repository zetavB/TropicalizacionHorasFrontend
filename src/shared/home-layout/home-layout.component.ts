import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements  OnInit {
  drawerVisible = false;

  ngOnInit(): void {
    // TODO: suscribirse al estado de si está loggeado para cambiar el drawerVisible
  }
}
