import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Estudiante } from '../../models/estudiante.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

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

  getProfile(): void {
    this.userService.getResponse('estudiante1@estudiante.com')
    .subscribe(estudiante => this.profile = estudiante);
  }

  ngOnInit() {
    this.getProfile();
  }
}
