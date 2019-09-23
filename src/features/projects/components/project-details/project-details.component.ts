import {Component, OnDestroy, OnInit} from '@angular/core';
import {getProjectDetailsProject, State} from '../../state';
import {select, Store} from '@ngrx/store';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectModel} from '../../../../models/entities/project.model';
import {ChangeDescription, SelectProject} from '../../state/projects.actions';
import {takeWhile} from 'rxjs/operators';

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
      if (p === undefined || p === null) {
        this.router.navigate(['proyectos']);
      } else {
        this.project = p;
        this.description.patchValue(this.project.descripcion);
      }
    });
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

}
