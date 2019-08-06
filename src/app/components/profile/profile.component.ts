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

  user: Observable<{email: string}>;
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
    private store: Store<AppState>) {
    }

  getProfile(email: string): void {
    this.userService.getResponse(email).subscribe(estudiante => this.profile = estudiante);
  }

  ngOnInit() {
    this.store.select('user').subscribe(user => this.getProfile(user.email));
  }
}
