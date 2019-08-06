import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/core/user.service';

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
    private store: Store<{email: string, rol: string}>) {
    }

  getProfile(email: string): void {
    this.userService.getResponse(email).subscribe(estudiante => this.profile = estudiante);
  }

  ngOnInit() {
    this.store.select('user').subscribe(user => this.getProfile(user.email));
  }
}
