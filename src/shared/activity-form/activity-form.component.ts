import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/models/activity.model';
import { BehaviorSubject } from 'rxjs';
import { Archivo } from 'src/models/archivo.model';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  activityForm = this.fb.group({
    proyecto: ['', Validators.required],
    categoria: ['', Validators.required],
    horas: ['', [Validators.required, Validators.pattern('[0-9]{1,3}')]],
    fecha: ['', Validators.required],
    detalles: [''],
    archivos: []
  });

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
  @Output() submitted = new EventEmitter<{activity: Activity, files: Archivo[]}>();
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
    console.log(activity);
    this.activityForm.setValue({
      proyecto: activity.proyecto.nombre,
      categoria: activity.categoria.nombre,
      horas: activity.horas,
      fecha: activity.fecha,
      detalles: activity.detalles,
      archivos: []
    });
  }

  removeFile(fileURI: string) {
    const index = this.files.findIndex(x => x.uri === fileURI);
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
      estudiante: {usuario: {correo: this.activity.value.estudiante.usuario.correo}},
      detalles: this.activityForm.value.detalles
    };
    const files = this.files;
    this.submitted.emit({activity, files});
  }
}
