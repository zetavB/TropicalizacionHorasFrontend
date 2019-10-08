import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getProjectDetailsStudentsPage, getProjectDetailsStudentsPageContent, State} from '../../state';
import {Observable} from 'rxjs';
import {Estudiante} from '../../../../models/entities/estudiante.model';
import {LoadProjectStudents, ProjectRemoveStudent, ProjectStudentsChangePage} from '../../state/projects.actions';
import {Page} from '../../../../models/Page';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-project-students',
  templateUrl: './project-students.component.html',
  styleUrls: ['./project-students.component.css']
})
export class ProjectStudentsComponent implements OnInit {
  @Input() projectName: string;

  constructor(private store$: Store<State>) { }

  studentsPage$: Observable<Page<Estudiante>>;
  students$: Observable<Estudiante[]>;

  displayedColumns: string[] = ['email', 'name', 'lastN1', 'lastN2', 'erase', 'carne'];

  ngOnInit() {
    this.studentsPage$ = this.store$.select(getProjectDetailsStudentsPage);
    this.students$ = this.store$.select(getProjectDetailsStudentsPageContent);

    this.store$.dispatch(new LoadProjectStudents(this.projectName));
  }

  removeStudent(student: Estudiante) {
    this.store$.dispatch(new ProjectRemoveStudent(student));
  }

  getNewPage($event: PageEvent) {
    this.store$.dispatch(new ProjectStudentsChangePage($event.pageSize, $event.pageIndex));
  }
}
