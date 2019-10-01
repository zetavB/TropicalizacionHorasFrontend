import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../../../projects/state';
import {AddCategory} from '../../state/categories.actions';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm = this.fb.group({
    name: ['', [Validators.required]]
  });


  get name() {return this.addCategoryForm.get('name'); }

  constructor(private store$: Store<State>, private fb: FormBuilder) { }

  ngOnInit() {
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      this.store$.dispatch(new AddCategory(this.name.value));
    }
  }

}
