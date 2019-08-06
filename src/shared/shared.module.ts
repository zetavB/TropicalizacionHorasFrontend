import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CustomMaterialModule} from '../app/material.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    HomeLayoutComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    HomeLayoutComponent,
    SidebarComponent
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
