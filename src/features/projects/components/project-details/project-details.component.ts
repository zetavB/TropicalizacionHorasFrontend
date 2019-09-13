import { Component, OnInit } from '@angular/core';
import {getProjectDetailsProject, State} from '../../state';
import {Store} from '@ngrx/store';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProjectModel} from '../../../../models/entities/project.model';
import {SelectProject} from '../../state/projects.actions';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  editDescriptionForm = this.fb.group({
    description: ['', [Validators.required]]
  });

  editing = false;
  project$: Observable<ProjectModel>;

  get description() {return this.editDescriptionForm.get('description'); }

  constructor(
    private store$: Store<State>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>
        this.store$.dispatch(new SelectProject(params.get('nombre')))
    );

    this.project$ = this.store$.select(getProjectDetailsProject);
  }

}
