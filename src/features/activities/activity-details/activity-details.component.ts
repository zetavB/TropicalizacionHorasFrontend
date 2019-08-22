import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/models/activity.model';
import { Store } from '@ngrx/store';

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
    this.activity$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.activitiesService.getActivity(params.get('id')))
    );
  }
}
