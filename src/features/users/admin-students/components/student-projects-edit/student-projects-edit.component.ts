import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../../../../../models/Page';
import {ProjectModel} from '../../../../../models/entities/project.model';
import {getStudentProjectsWithSelected, State} from '../../state';
import {Store} from '@ngrx/store';
import {LoadProjects, ProjectsListChangePage} from '../../../../projects/state/projects.actions';
import {getProjectsListProjectsPage, getProjectsListProjectsPageContent} from '../../../../projects/state';
import {ProjectToAddModel} from './project-to-add.model';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {PageEvent} from '@angular/material/paginator';
import {DeselectProject, SelectProject} from '../../state/student.actions';

@Component({
  selector: 'app-student-projects-edit',
  templateUrl: './student-projects-edit.component.html',
  styleUrls: ['./student-projects-edit.component.css']
})
export class StudentProjectsEditComponent implements OnInit {

  constructor(private store$: Store<State>) { }

  projectsPage$: Observable<Page<ProjectModel>>;
  projects$: Observable<ProjectToAddModel[]>;

  displayedColumns: string[] = ['nombre', 'descripcion', 'select'];

  ngOnInit() {
    this.store$.dispatch(new LoadProjects());

    this.projectsPage$ = this.store$.select(getProjectsListProjectsPage);
    this.projects$ = this.store$.select(getStudentProjectsWithSelected);
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
}
