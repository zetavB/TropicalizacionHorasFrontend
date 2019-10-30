import {Component, OnDestroy, OnInit} from '@angular/core';
import {getSelectedStudent, getSelectedStudentProjects, State} from '../../state';
import {Store} from '@ngrx/store';
import {FormBuilder, Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SelectProject} from '../../../../projects/state/projects.actions';
import {
  AddStudent,
  DeleteStudent,
  EditStudent,
  LoadStudentActivities,
  SelectStudent,
  SelectStudentProjects
} from '../../state/student.actions';
import {Estudiante} from '../../../../../models/entities/estudiante.model';
import {Usuario} from '../../../../../models/entities/usuario.model';
import {UserService} from '../../../../../core/user.service';
import {Observable} from 'rxjs';
import {getUserRole} from '../../../../login/state';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  constructor(private store$: Store<State>,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  alive = true;
  editing = false;
  adding = false;
  proyectos$: Observable<string[]>;
  student: Estudiante = null;
  role$: Observable<string>;

  statuses = ['Activo', 'Prórroga', 'Finalizado', 'Inactivo'];
  types = ['Traslado', 'Regular', 'Pasantía'];

  studentForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(8), Validators.minLength(8)]],
    name: ['', [Validators.required, Validators.pattern('[a-z A-ZáéíóúÁÉÍÓÚ]+')]],
    lastNames: ['', [Validators.required, Validators.pattern('[a-z A-ZáéíóúÁÉÍÓÚ]+')]],
    carne: ['', [Validators.required, Validators.pattern('[A-Z]?[0-9]+')]],
    hours: ['', [Validators.required, Validators.pattern('[0-9]')]],
    days: [''],
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
  get days() {
    return this.studentForm.get('days');
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
    this.studentForm.disable();

    this.route.paramMap.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: ParamMap) => {
        if (params.get('correo') !== 'agregar') {
          this.store$.dispatch(new SelectStudent(params.get('correo')));
        } else {
          this.adding = true;
          this.studentForm.enable();
        }
      }
    );

    this.proyectos$ = this.store$.select(getSelectedStudentProjects);
    this.role$ = this.store$.select(getUserRole);

    this.store$.select(getSelectedStudent).subscribe((student: Estudiante) => {
      if (!this.adding) {
        this.student = student;
        if (student !== undefined) {
          this.showStudent();
        } else {
          this.router.navigate(['/usuarios']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  public startEditing(): void {
    this.editing = true;
    this.studentForm.enable();
  }
  public stopEditing(): void {
    this.editing = false;
    this.studentForm.disable();
    this.showStudent();
  }

  private showStudent(): void {
    this.email.setValue(this.student.usuario.correo);
    this.name.setValue(this.student.usuario.nombre);
    this.phone.setValue(this.student.usuario.telefono);
    this.lastNames.setValue(this.student.usuario.apellidos);
    this.carne.setValue(this.student.carne);
    this.hours.setValue(this.student.horasTotales);
    this.days.setValue(this.userService.getDateDifference(this.student.fechaFinal));
    this.type.setValue(this.student.tipo);
    this.status.setValue(this.student.estado);
    this.startDate.setValue(this.student.fechaInicio);
    this.endDate.setValue(this.student.fechaFinal);
  }

  public editStudent(): void {
    const newStudent = {
      usuario: {
        correo: this.email.value,
        nombre: this.name.value,
        apellidos: this.lastNames.value,
        telefono: this.phone.value,
        activado: true
      } as Usuario,
      fechaInicio: this.startDate.value,
      fechaFinal: this.endDate.value,
      tipo: this.type.value,
      estado: this.status.value,
      horasTotales: this.hours.value,
      carne: this.carne.value,
      diasRestantes: this.student.diasRestantes,
    } as Estudiante;
    this.store$.dispatch(new EditStudent(newStudent));
    this.stopEditing();
  }

  editProjects() {
    this.store$.dispatch(new SelectStudentProjects());
    this.router.navigate(['/proyectos/editar-proyectos-estudiante/', this.student.usuario.correo]);
  }

  deleteStudent() {
    this.store$.dispatch(new DeleteStudent(this.email.value));
  }

  addStudent() {
    this.store$.dispatch(new AddStudent( {
      usuario: {
        correo: this.email.value,
        nombre: this.name.value,
        apellidos: this.lastNames.value,
        telefono: this.phone.value,
        activado: true
      } as Usuario,
      fechaInicio: this.startDate.value,
      fechaFinal: this.endDate.value,
      tipo: this.type.value,
      estado: this.status.value,
      horasTotales: this.hours.value,
      carne: this.carne.value,
      diasRestantes: 0,
      proyectos: []
    } as Estudiante));
  }
}
