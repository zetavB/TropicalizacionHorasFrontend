import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../../../../../models/Page';
import {LoadProjects, ProjectsListChangePage} from '../../../../projects/state/projects.actions';
import {PageEvent} from '@angular/material/paginator';
import {getStudentsPage, getStudentsPageContent, State} from '../../state';
import {Estudiante} from '../../../../../models/entities/estudiante.model';
import {ChangeStudentsPage, LoadStudents} from '../../state/student.actions';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  constructor(private store$: Store<State>, private router: Router) { }

  studentsPage$: Observable<Page<Estudiante>>;
  students$: Observable<Estudiante[]>;

  displayedColumns: string[] = ['email', 'name', 'lastN1', 'lastN2', 'carne'];

  ngOnInit() {
    this.studentsPage$ = this.store$.select(getStudentsPage);
    this.students$ = this.store$.select(getStudentsPageContent);

    this.store$.dispatch(new LoadStudents());
  }

  getNewPage($event: PageEvent) {
    this.store$.dispatch(new ChangeStudentsPage($event.pageSize, $event.pageIndex));
  }

}
