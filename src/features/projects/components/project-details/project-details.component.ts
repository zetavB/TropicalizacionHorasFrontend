import {Component, OnDestroy, OnInit} from '@angular/core';
import {getProjectDetailsProject, State} from '../../state';
import {select, Store} from '@ngrx/store';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectModel} from '../../../../models/entities/project.model';
import {ChangeDescription, LoadProject, SelectProject} from '../../state/projects.actions';
import {map, takeWhile} from 'rxjs/operators';
import {getUserRole} from '../../../login/state';
import {UserRoles} from '../../../../models/user-roles.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  editDescriptionForm = this.fb.group({
    description: ['', [Validators.required]]
  });

  editing = false;
  project: ProjectModel = {
    nombre: '',
    descripcion: ''
  };

  alive = true;
  isStudent$: Observable<boolean>;

  get description() {
    return this.editDescriptionForm.get('description');
  }

  constructor(
    private store$: Store<State>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: ParamMap) =>
      this.store$.dispatch(new SelectProject(params.get('nombre')))
    );

    this.store$.pipe(
      select(getProjectDetailsProject),
      takeWhile(() => this.alive)
    ).subscribe((p: ProjectModel) => {
      this.project = p;
      if (p.descripcion === undefined) {
        this.store$.dispatch(new LoadProject(p.nombre));
      } else {
        this.description.patchValue(this.project.descripcion);
      }
    });

    this.isStudent$ = this.store$.select(getUserRole).pipe(
      map(role => role === UserRoles.Student)
    );
  }

  private changeDescription(): void {
    this.store$.dispatch(new ChangeDescription({nombre: this.project.nombre, descripcion: this.description.value}));
    this.editing = false;
  }

  private stopEditing(): void {
    this.editing = false;
    this.description.patchValue(this.project.descripcion);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  deleteProject() {

  }
}
