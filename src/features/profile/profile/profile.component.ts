import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/core/user.service';
import {getPendingHours, getProfileStudent, State} from '../state';
import {LoadPendingHours, LoadPendingHoursS, LoadProfile} from '../state/profile.actions';
import {getTokenInfo} from '../../login/state';
import {take} from 'rxjs/operators';
import {JwtInfoModel} from '../../../models/jwt-info.model';
import {Estudiante} from '../../../models/entities/estudiante.model';
import {Usuario} from '../../../models/entities/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: Observable<{email: string}>;
  diasRestantes: '';
  profile: Estudiante;
  perfilVacio: Estudiante = {
    diasRestantes: 0,
    carne: '',
    estado: '',
    fechaFinal: '',
    fechaInicio: '',
    horasTotales: 0,
    proyectos: [{nombre: ''}],
    tipo: '',
    usuario: {
      activado: false,
      apellidos: '',
      correo: '',
      nombre: '',
      telefono: ''
    } as Usuario
  } as Estudiante;
  pendingHours$: Observable<number>;

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
    ).subscribe((info: JwtInfoModel) => {
      if (info != null) {
        this.store.dispatch(new LoadProfile(info.sub));
        this.store.dispatch(new LoadPendingHours(info.sub));
      }
    });

    this.pendingHours$ = this.store.select(getPendingHours);
  }
}
