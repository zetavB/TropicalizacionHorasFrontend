import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getProjectsListProjects, State} from '../../state';
import {Observable} from 'rxjs';
import {LoadProjects} from '../../state/projects.actions';
import {Router} from '@angular/router';
import {ProjectModel} from '../../../../models/entities/project.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  constructor(private store$: Store<State>, private router: Router) { }

  projects$: Observable<ProjectModel[]>;

  displayedColumns: string[] = ['nombre', 'descripcion'];

  ngOnInit() {
    this.projects$ = this.store$.select(getProjectsListProjects);

    this.store$.dispatch(new LoadProjects());
  }
}
