import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { getActivityId, getActivityDetails, getActivityFiles } from '../state';
import { LoadActivityDetails } from '../state/activities.actions';
import { ActivityState } from '../state/activities.reducer';
import { NgxSpinnerService } from 'ngx-spinner';
import {Activity} from '../../../models/entities/activity.model';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  constructor(
    private store: Store <ActivityState>,
    private activitiesService: ActivitiesService,
    private spinner: NgxSpinnerService
  ) {}

  activity: Activity = {
    idGenerado: 0,
    fecha: '',
    horas: null,
    estado: '',
    categoria: {nombre: ''},
    proyecto: {nombre: ''},
    estudiante: {usuario: {correo: ''}},
    detalles: '',
    justificacionRechazo: null
  };
  files = [];
  imageURIs = [];
  fileURIs = [];

  ngOnInit() {
    this.spinner.show();
    this.store.pipe(
      select(getActivityId),
      take(1),
    ).subscribe((id: number) => this.store.dispatch(new LoadActivityDetails(id)));

    this.store.select(getActivityDetails).subscribe(res => {
      this.activity = res;
    });

    this.store.select(getActivityFiles).subscribe(res => {
      this.files = res;
      if (res.length !== 0) {
        const URIs = this.activitiesService.separateActivityImages(this.files);
        console.log(URIs);
        this.imageURIs = URIs[0];
        this.fileURIs = URIs[1];
      }
    });
  }
}
