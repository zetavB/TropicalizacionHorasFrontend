import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/models/activity.model';
import { Store } from '@ngrx/store';
import { getActivity } from '../state';
import { LoadActivityDetails } from '../state/activities.actions';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private store: Store <{email: string, rol: string}>,
  ) {}

  activity$: Observable<Activity>;
  emptyActivity: Activity = {
    idGenerado: 0,
    fecha: '',
    horas: 0,
    estado: '',
    categoria: {nombre: ''},
    proyecto: {nombre: ''},
    estudiante: {usuario: {correo: ''}},
    detalles: ''
  };

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.store.dispatch(new LoadActivityDetails(params.get('id')));
    //   );
    // )
    // this.store.dispatch(new LoadActivityDetails(params['id']))
  }
}
