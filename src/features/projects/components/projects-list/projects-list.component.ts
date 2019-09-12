import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getProjectsListProjects, State} from '../../state';
import {Observable} from 'rxjs';
import {ProjectModel} from '../../../../models/project.model';
import {LoadProjects} from '../../state/projects.actions';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  constructor(private store$: Store<State>) { }

  projects$: Observable<ProjectModel[]>;

  displayedColumns: string[] = ['nombre', 'descripcion'];

  ngOnInit() {
    this.projects$ = this.store$.select(getProjectsListProjects);

    this.store$.dispatch(new LoadProjects());
  }

}
