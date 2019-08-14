import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../../models/estudiante.model';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/core/user.service';
import {getProfileStudent, State} from '../state';
import {LoadProfile} from '../state/profile.actions';
import {getTokenInfo} from '../../login/state';
import {take} from 'rxjs/operators';
import {JwtInfoModel} from '../../../models/jwt-info.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: Observable<{email: string}>;
  diasRestantes: '';
  profile: Estudiante;
  perfilVacio = {
    tipo: '',
    estado: '',
    horasTotales: 0,
    diasRestantes: 0,
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
    private store: Store<State>) {
    }

  ngOnInit() {
    this.store.pipe(
      select(getProfileStudent)
    ).subscribe(stu => this.profile = stu == null ? this.perfilVacio : stu);

    this.store.pipe(
      select(getTokenInfo),
      take(1)
    ).subscribe((info: JwtInfoModel) => this.store.dispatch(new LoadProfile(info.sub)));
  }
}
