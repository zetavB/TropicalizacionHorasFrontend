import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Estudiante } from '../../models/estudiante.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email: Observable<string>;
  profile: Estudiante = {
    tipo: '',
    estado: '',
    horasTotales: 0,
    proyectos: ['', ''],
    fechaFinal: '',
    fechaInicio: '',
    carne: '',
    usuario: {
      correo: '',
      nombre: '',
      apellidos: '',
      telefono: '',
    }
  };

  constructor(
    private userService: UserService,
    private store: Store<{email: string}>) {
      // this.email = this.store.select('email');
    }

  getProfile(): void {
    this.userService.getResponse('estudiante1@estudiante.com')
    .subscribe(estudiante => this.profile = estudiante);
  }

  ngOnInit() {
    this.email = this.store.select('email');
    console.log(this.email);
    this.getProfile();
  }
}
