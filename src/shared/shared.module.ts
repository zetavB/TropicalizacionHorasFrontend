import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CustomMaterialModule} from '../app/material.module';
import {RouterModule} from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    HomeLayoutComponent,
    SidebarComponent,
    DialogComponent,
    ActivityFormComponent
  ],
  exports: [
    HeaderComponent,
    HomeLayoutComponent,
    SidebarComponent,
    ActivityFormComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [ ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
