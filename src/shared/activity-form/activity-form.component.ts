import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/models/activity.model';
import { BehaviorSubject } from 'rxjs';
import { Archivo } from 'src/models/archivo.model';
import { numberRangeValidator, dateMaxRangeValidator } from '../../utils/validators';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  @ViewChild('file', { static: false }) file;

  constructor(private fb: FormBuilder) { }

  activityForm = this.fb.group({
    proyecto: ['', Validators.required],
    categoria: ['', Validators.required],
    horas: ['', [Validators.required, numberRangeValidator(0, 301)]],
    fecha: ['', [Validators.required, dateMaxRangeValidator(new Date())]],
    detalles: [''],
    archivos: []
  });
  filesToUpload: Set<File> = new Set();
  fileURIsToRemove: string[] = [];

  activity = new BehaviorSubject<Activity>(
    {
      idGenerado: 0,
      fecha: '',
      horas: 0,
      estado: '',
      categoria: {nombre: ''},
      proyecto: {nombre: ''},
      estudiante: {usuario: {correo: ''}},
      detalles: ''
    }
  );

  @Input() categories: [];
  @Input() projects: [];
  @Input() files: Archivo[];
  @Input() studentEmail: string;
  @Output() submitted = new EventEmitter<{activity: Activity, files: Set<File>, fileURIsToRemove: string[]}>();
  @Input()
  set activityValue(value: Activity) {
    this.activity.next(value);
  }

  get activityValue() {
    return this.activity.value;
  }

  ngOnInit() {
    this.activity.subscribe(newActivity => this.loadActivity(newActivity));
  }

  loadActivity(activity: Activity) {
    this.activityForm.setValue({
      proyecto: activity.proyecto.nombre,
      categoria: activity.categoria.nombre,
      horas: activity.horas,
      fecha: activity.fecha,
      detalles: activity.detalles,
      archivos: []
    });
  }


  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.filesToUpload.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  removeFile(fileToRemove: File) {
    this.filesToUpload.forEach(file => {
      if (file === fileToRemove) {
        this.filesToUpload.delete(file);
      }
    });
  }

  removeFileURI(fileName: string) {
    const index = this.files.findIndex(x => x.nombre === fileName);
    this.fileURIsToRemove.push(fileName);
    this.files.splice(index, 1);
  }

  onSubmit() {
    const activity: Activity = {
      idGenerado: this.activity.value.idGenerado,
      fecha: this.activityForm.value.fecha,
      horas: this.activityForm.value.horas,
      estado: 'Pendiente',
      categoria: {nombre: this.activityForm.value.categoria},
      proyecto: {nombre: this.activityForm.value.proyecto},
      estudiante: {usuario: {correo: this.studentEmail}},
      detalles: this.activityForm.value.detalles
    };
    const files = this.filesToUpload;
    const fileURIsToRemove = this.fileURIsToRemove;
    this.submitted.emit({activity, files, fileURIsToRemove});
  }
}
