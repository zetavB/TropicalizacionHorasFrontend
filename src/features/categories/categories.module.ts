import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AddCategoryComponent } from './components/add-categorie/add-category.component';
import { StoreModule } from '@ngrx/store';
import * as fromCategories from './state/categories.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './state/categories.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../app/material.module';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesService} from './categories.service';



@NgModule({
  declarations: [CategoriesHomeComponent, CategoriesListComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    CategoriesRoutingModule,
    StoreModule.forFeature(fromCategories.categoriesFeatureKey, fromCategories.reducer),
    EffectsModule.forFeature([CategoriesEffects])
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoriesModule { }
