import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../../../../models/Page';
import {ProjectModel} from '../../../../models/entities/project.model';
import {getSelectedStudent, getStudentProjectsWithSelected, State} from '../../../users/admin-students/state';
import {Store} from '@ngrx/store';
import {LoadProjects, ProjectsListChangePage} from '../../state/projects.actions';
import {getProjectsListProjectsPage, getProjectsListProjectsPageContent} from '../../state';
import {ProjectToAddModel} from './project-to-add.model';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {PageEvent} from '@angular/material/paginator';
import {DeselectProject, EditStudentProjects, SelectProject} from '../../../users/admin-students/state/student.actions';
import {Estudiante} from '../../../../models/entities/estudiante.model';

@Component({
  selector: 'app-student-projects-edit',
  templateUrl: './student-projects-edit.component.html',
  styleUrls: ['./student-projects-edit.component.css']
})
export class StudentProjectsEditComponent implements OnInit {

  constructor(private store$: Store<State>) { }

  projectsPage$: Observable<Page<ProjectModel>>;
  projects$: Observable<ProjectToAddModel[]>;
  student$: Observable<Estudiante>;

  displayedColumns: string[] = ['nombre', 'descripcion', 'select'];

  ngOnInit() {
    this.store$.dispatch(new LoadProjects());

    this.projectsPage$ = this.store$.select(getProjectsListProjectsPage);
    this.projects$ = this.store$.select(getStudentProjectsWithSelected);
    this.student$ = this.store$.select(getSelectedStudent);
  }

  chooseProject($event: MatCheckboxChange, project: ProjectModel) {
    this.store$.dispatch($event.checked ?
      new SelectProject(project.nombre)
      :
      new DeselectProject(project.nombre)
    );
  }

  getNewPage($event: PageEvent) {
    this.store$.dispatch(new ProjectsListChangePage($event.pageIndex, $event.pageSize));
  }

  editStudentProjects() {
    this.store$.dispatch(new EditStudentProjects());
  }
}
