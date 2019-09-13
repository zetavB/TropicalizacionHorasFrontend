import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../state';
import {FormBuilder, Validators} from '@angular/forms';
import {CreateProject} from '../../state/projects.actions';
import {ProjectModel} from '../../../../models/entities/project.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  addProjectForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });


  get name() {return this.addProjectForm.get('name'); }
  get description() {return this.addProjectForm.get('description'); }

  constructor(private store$: Store<State>, private fb: FormBuilder) { }

  ngOnInit() {
  }

  addProject() {
    if (this.addProjectForm.valid) {
      this.store$.dispatch(new CreateProject({
        nombre: this.name.value,
        descripcion: this.description.value
      } as ProjectModel));
    }
  }
}
