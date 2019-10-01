import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getCategories, State} from '../../state';
import {Observable} from 'rxjs';
import {DeleteCategory, LoadCategories} from '../../state/categories.actions';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  constructor(private store$: Store<State>) { }

  displayedColumns: string[] = ['name', 'delete'];

  categories$: Observable<string[]>;

  ngOnInit() {
    this.store$.dispatch(new LoadCategories());

    this.categories$ = this.store$.select(getCategories);
  }

  deleteCategory(catName: string) {
    this.store$.dispatch(new DeleteCategory(catName));
  }
}
