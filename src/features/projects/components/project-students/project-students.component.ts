import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getProjectDetailsStudentsPage, State} from '../../state';
import {Observable} from 'rxjs';
import {Estudiante} from '../../../../models/entities/estudiante.model';
import {LoadProjectStudents} from '../../state/projects.actions';
import {Page} from '../../../../models/Page';

@Component({
  selector: 'app-project-students',
  templateUrl: './project-students.component.html',
  styleUrls: ['./project-students.component.css']
})
export class ProjectStudentsComponent implements OnInit {
  @Input() projectName: string;

  constructor(private store$: Store<State>) { }

  students$: Observable<Page<Estudiante>>;

  displayedColumns: string[] = ['email', 'name', 'lastN1', 'lastN2'];

  ngOnInit() {
    this.students$ = this.store$.select(getProjectDetailsStudentsPage);

    this.store$.dispatch(new LoadProjectStudents(this.projectName));
  }

}
