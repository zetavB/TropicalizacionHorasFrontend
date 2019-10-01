import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesHomeComponent} from './components/categories-home/categories-home.component';

const categoriesRoutes: Routes = [
  {path: '', component: CategoriesHomeComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(categoriesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoriesRoutingModule { }
