import {Component, OnDestroy, OnInit} from '@angular/core';
import {getSelectedStudent, State} from '../../state';
import {Store} from '@ngrx/store';
import {FormBuilder, Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SelectProject} from '../../../../projects/state/projects.actions';
import {LoadStudentActivities, SelectStudent} from '../../state/student.actions';
import {Estudiante} from '../../../../../models/entities/estudiante.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  constructor(private store$: Store<State>,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
  }

  alive = true;
  editing = false;
  proyectos: string[];

  statuses = ['Activo', 'Prórroga', 'Finalizado', 'Inactivo'];
  types = ['Traslado', 'Regular', 'Pasantía'];

  studentForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    name: ['', [Validators.required, Validators.pattern('[a-z A-Z]+')]],
    lastNames: ['', [Validators.required, Validators.pattern('[a-z A-Z]+')]],
    carne: ['', [Validators.required, Validators.pattern('[A-Z]?[0-9]+')]],
    hours: ['', [Validators.required, Validators.pattern('[0-9]')]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: [''],
  });

  get email() {
    return this.studentForm.get('email');
  }

  get phone() {
    return this.studentForm.get('phone');
  }

  get name() {
    return this.studentForm.get('name');
  }

  get lastNames() {
    return this.studentForm.get('lastNames');
  }

  get carne() {
    return this.studentForm.get('carne');
  }

  get hours() {
    return this.studentForm.get('hours');
  }

  get type() {
    return this.studentForm.get('type');
  }

  get status() {
    return this.studentForm.get('status');
  }

  get startDate() {
    return this.studentForm.get('startDate');
  }

  get endDate() {
    return this.studentForm.get('endDate');
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: ParamMap) =>
      this.store$.dispatch(new SelectStudent(params.get('correo')))
    );

    this.store$.select(getSelectedStudent).subscribe((student: Estudiante) => {
      if (student !== undefined) {
        this.showStudent(student);
      } else {
        this.router.navigate(['/usuarios']);
      }
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  private showStudent(student: Estudiante) {
    this.store$.dispatch(new LoadStudentActivities(student.usuario.correo));
    this.proyectos = student.proyectos.map(obj => obj.nombre);

    this.email.setValue(student.usuario.correo);
    this.name.setValue(student.usuario.nombre);
    this.phone.setValue(student.usuario.telefono);
    this.lastNames.setValue(student.usuario.apellidos);
    this.carne.setValue(student.carne);
    this.hours.setValue(student.horasTotales);
    this.type.setValue(student.tipo);
    this.status.setValue(student.estado);
    this.startDate.setValue(student.fechaInicio);
    this.startDate.setValue(student.fechaFinal);
  }
}
