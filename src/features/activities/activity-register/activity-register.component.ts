import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Store } from '@ngrx/store';
import { UserService } from 'src/core/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AddActivity } from '../state/activities.actions';
import { ActivityState } from '../state/activities.reducer';
import { NgxSpinnerService } from 'ngx-spinner';
import { numberRangeValidator, dateMaxRangeValidator } from 'src/utils/validators';
import {Activity} from '../../../models/entities/activity.model';


@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.scss']
})
export class ActivityRegisterComponent implements OnInit {

  @ViewChild('file', { static: false }) file;

  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService,
    private store: Store <ActivityState>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  files: Set<File> = new Set();
  enableButton: false;
  categories = [];
  projects = [];
  studentEmail = '';
  id = '';
  activityForm = this.fb.group({
    proyecto: ['', Validators.required],
    categoria: ['', Validators.required],
    horas: ['', [Validators.required, numberRangeValidator(1, 300)]],
    fecha: ['', [Validators.required, dateMaxRangeValidator(new Date())]],
    detalles: [''],
    archivos: []
  });
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

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

  ngOnInit() {
    this.spinner.show();
    this.store.select('login').subscribe(state => {
        this.studentEmail = state.tokenInfo.sub;
        this.userService.getStudent(state.tokenInfo.sub).subscribe(student => {
          console.log(student);
          this.projects = student.proyectos;
          this.spinner.hide();
        });
      });

    this.activitiesService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
      this.spinner.hide();
    });
  }


  onSubmit(data: {activity: Activity, files: Set<File>, fileURIsToRemove: string[]}) {

    const {activity, files} = data;
    console.log(activity);
    console.log(files);
    this.spinner.show();
    this.store.dispatch(new AddActivity({activity, files}));
  }

  addActivity() {
    this.spinner.show();
    const activity: Activity = {
      idGenerado: 0,
      fecha: this.activityForm.value.fecha,
      horas: this.activityForm.value.horas,
      estado: 'Pendiente',
      categoria: {nombre: this.activityForm.value.categoria},
      proyecto: {nombre: this.activityForm.value.proyecto},
      estudiante: {usuario: {correo: this.studentEmail}},
      detalles: this.activityForm.value.detalles,
      justificacionRechazo: null
    };
    const files = this.files;
    this.store.dispatch(new AddActivity({activity, files}));
  }
}
