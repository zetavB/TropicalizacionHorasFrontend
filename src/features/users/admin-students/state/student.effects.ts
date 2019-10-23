import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {catchError, concatMap, exhaustMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import {
  StudentActionTypes,
  StudentActions,
  LoadStudents,
  LoadStudentsS,
  LoadStudentsF,
  LoadStudentActivities,
  LoadStudentActivitiesS,
  LoadStudentActivitiesF,
  ChangeStudentActivitiesPage,
  AddStudent,
  AddStudentS,
  AddStudentF,
  EditStudent,
  EditStudentS,
  EditStudentF,
  DeleteStudent,
  DeleteStudentS,
  DeleteStudentF,
  EditStudentProjects,
  EditStudentProjectsS,
  EditStudentProjectsF,
  SelectStudent
} from './student.actions';
import {AdminStudentsService} from '../admin-students.service';
import {State} from './index';
import {Action, Store} from '@ngrx/store';
import {Estudiante} from '../../../../models/entities/estudiante.model';
import {Page} from '../../../../models/Page';
import {Activity} from '../../../../models/entities/activity.model';
import {Router} from '@angular/router';
import {ProjectModel} from '../../../../models/entities/project.model';



@Injectable()
export class StudentEffects {

  @Effect()
  loadStudents$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.LoadStudents),
    withLatestFrom(this.store$),
    map(([, state]: [LoadStudents, State]) => [state.students.studentsList.studentsPage]),
    concatMap(([studentsPage]: [Page<Estudiante>]) =>
      this.studentsService.getStudents(studentsPage.size, studentsPage.number).pipe(
        map((students: Page<Estudiante>) => new LoadStudentsS(students)),
        catchError(() => of(new LoadStudentsF()))
      )
    )
  );

  @Effect()
  changeStudentsPage$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.ChangeStudentsPage),
    map(() => new LoadStudents())
  );

  @Effect()
  loadStudentActivities: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.LoadStudentActivities),
    withLatestFrom(this.store$),
    map(([action, state]: [LoadStudentActivities, State]) => [action.email, state.students.studentProfile.activitiesPage]),
    concatMap(([email, activitiesPage]: [string, Page<Activity>]) =>
      this.studentsService.getStudentActivities(email, activitiesPage.size, activitiesPage.number).pipe(
        map((activities: Page<Activity>) => new LoadStudentActivitiesS(activities)),
        catchError(() => of(new LoadStudentActivitiesF()))
      )
    )
  );

  @Effect()
  changeStudentActivitiesPage$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.ChangeStudentActivitiesPage),
    withLatestFrom(this.store$),
    map(([, state]: [ChangeStudentActivitiesPage, State]) => [state.students.studentProfile.selectedStudent]),
    map(([student]: [Estudiante]) => new LoadStudentActivities(student.usuario.correo))
  );

  @Effect()
  editStudentProjects$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.EditStudentProjects),
    withLatestFrom(this.store$),
    map(([, state]: [EditStudentProjects, State]) =>
      [state.students.studentProfile.selectedStudent.usuario.correo,
      state.students.editProjects.selectedProjects]
    ),
    exhaustMap(([email, projects]: [string, string[]]) =>
      this.studentsService.editProjects(email, projects).pipe(
        map(() => new EditStudentProjectsS(email)),
        catchError(() => of(new EditStudentProjectsF()))
      )
    )
  );

  @Effect({dispatch: false})
  editStudentProjectsS$ = this.actions$.pipe(
    ofType(StudentActionTypes.EditStudentProjectsS),
    map((action: EditStudentProjectsS) => action.studentEmail),
    tap(email => this.router.navigate(['/usuarios/estudiante/', email]))
  );

  @Effect()
  addStudent$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.AddStudent),
    map((action: AddStudent) => action.student),
    exhaustMap((student: Estudiante) =>
      this.studentsService.addStudent(student).pipe(
        map(() => new AddStudentS(student)),
        catchError(() => of(new AddStudentF()))
      )
    )
  );

  @Effect({dispatch: false})
  addStudentS$ = this.actions$.pipe(
    ofType(StudentActionTypes.AddStudentS),
    map((action: AddStudentS) => action.student),
    map((student) => {
      this.router.navigate(['/proyectos/editar-proyectos-estudiante/', student.usuario.correo]);
      return new SelectStudent(student.usuario.correo);
    })
  );

  @Effect()
  editStudent$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.EditStudent),
    withLatestFrom(this.store$),
    map(([action, state]: [EditStudent, State]) => {
      action.newStudent.proyectos = [...state.students.studentProfile.selectedStudent.proyectos];
      return action.newStudent;
    }),
    exhaustMap((student: Estudiante) =>
        this.studentsService.editStudent(student).pipe(
          map(() => new EditStudentS(student)),
          catchError(() => of(new EditStudentF()))
        )
    )
  );

  @Effect()
  deleteStudent$: Observable<Action> = this.actions$.pipe(
    ofType(StudentActionTypes.DeleteStudent),
    map((action: DeleteStudent) => action.email),
    exhaustMap((student: string) =>
      this.studentsService.deleteStudent(student).pipe(
        map(() => new DeleteStudentS(student)),
        catchError(() => of(new DeleteStudentF()))
      )
    )
  );

  @Effect({dispatch: false})
  deleteStudentS$ = this.actions$.pipe(
    ofType(StudentActionTypes.DeleteStudentS),
    tap(email => this.router.navigate(['/usuarios']))
  );

  constructor(private actions$: Actions<StudentActions>,
              private store$: Store<State>,
              private studentsService: AdminStudentsService,
              private router: Router) {}

}
