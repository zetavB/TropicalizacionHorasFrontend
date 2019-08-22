import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Store } from '@ngrx/store';
import { UserService } from 'src/core/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/models/activity.model';
import { AddActivity } from '../state/activities.actions';
import { ActivityState } from '../state/activities.reducer';


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
    // private store: Store <{email: string, rol: string}>,
    private fb: FormBuilder
  ) { }

  files: Set<File> = new Set();
  enableButton: false;
  categories = [];
  projects = [];
  studentEmail = '';
  activityForm = this.fb.group({
    proyecto: ['', Validators.required],
    categoria: ['', Validators.required],
    horas: ['', [Validators.required, Validators.pattern('[0-9]{1,3}')]],
    fecha: ['', Validators.required],
    detalles: [''],
    archivos: []
  });
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  ngOnInit() {
    this.store.select('login').subscribe(state => {
        this.studentEmail = state.tokenInfo.sub;
        this.userService.getStudent(state.tokenInfo.sub).subscribe(student => this.projects = student.proyectos);
      });
    this.activitiesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  removeFile(fileToRemove: File) {
    this.files.forEach(file => {
      if (file === fileToRemove) {
        this.files.delete(file);
      }
    });
  }

  addActivity() {
    const activity: Activity = {
      idGenerado: 0,
      fecha: this.activityForm.value.fecha,
      horas: this.activityForm.value.horas,
      estado: 'Pendiente',
      categoria: {nombre: this.activityForm.value.categoria},
      proyecto: {nombre: this.activityForm.value.proyecto},
      estudiante: {usuario: {correo: this.studentEmail}},
      detalles: this.activityForm.value.detalles
    };
    const files = this.files;
    this.store.dispatch(new AddActivity({activity, files}));
  }
}
