import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/models/activity.model';
import { Store, select } from '@ngrx/store';
import { getActivityId, getActivityDetails, getActivityFiles } from '../state';
import { LoadActivityDetails } from '../state/activities.actions';
import { ActivityState } from '../state/activities.reducer';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  constructor(
    private store: Store <ActivityState>,
  ) {}

  activity: Activity = {
    idGenerado: 0,
    fecha: '',
    horas: 0,
    estado: '',
    categoria: {nombre: ''},
    proyecto: {nombre: ''},
    estudiante: {usuario: {correo: ''}},
    detalles: ''
  };
  files = [];

  ngOnInit() {
    this.store.pipe(
      select(getActivityId),
      take(1),
    ).subscribe((id: number) => this.store.dispatch(new LoadActivityDetails(id)));

    this.store.select(getActivityDetails).subscribe(res => {
      this.activity = res;
    });

    this.store.select(getActivityFiles).subscribe(res => {
      this.files = res;
    });
  }
}
