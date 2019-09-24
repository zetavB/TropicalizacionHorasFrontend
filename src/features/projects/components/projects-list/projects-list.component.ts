import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getProjectsListProjectsPage, getProjectsListProjectsPageContent, State} from '../../state';
import {Observable} from 'rxjs';
import {LoadProjects, ProjectsListChangePage} from '../../state/projects.actions';
import {Router} from '@angular/router';
import {ProjectModel} from '../../../../models/entities/project.model';
import {Page} from '../../../../models/Page';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  constructor(private store$: Store<State>, private router: Router) { }

  projectsPage$: Observable<Page<ProjectModel>>;
  projects$: Observable<ProjectModel[]>;

  displayedColumns: string[] = ['nombre', 'descripcion'];

  ngOnInit() {
    this.projectsPage$ = this.store$.select(getProjectsListProjectsPage);
    this.projects$ = this.store$.select(getProjectsListProjectsPageContent);

    this.store$.dispatch(new LoadProjects());
  }

  getNewPage($event: PageEvent) {
    this.store$.dispatch(new ProjectsListChangePage($event.pageIndex, $event.pageSize));
  }
}
