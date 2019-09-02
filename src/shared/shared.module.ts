import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {HomeLayoutComponent} from './components/home-layout/home-layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {CustomMaterialModule} from '../app/material.module';
import {RouterModule} from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {SpinnerOverlayComponent} from './components/spinner-overlay/spinner-overlay.component';
import {SpinnerOverlayService} from './components/spinner-overlay/spinner-overlay.service';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    OverlayModule
  ],
  declarations: [
    HeaderComponent,
    HomeLayoutComponent,
    SidebarComponent,
    DialogComponent,
    SpinnerOverlayComponent
  ],
  exports: [
    HeaderComponent,
    HomeLayoutComponent,
    SidebarComponent
  ],
  entryComponents: [
    DialogComponent,
    SpinnerOverlayComponent
  ],
  providers: [
    SpinnerOverlayService
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
