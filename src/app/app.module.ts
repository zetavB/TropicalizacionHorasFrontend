import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {LoginModule} from '../features/login/login.module';
import {ProfileModule} from '../features/profile/profile.module';
import {EffectsModule} from '@ngrx/effects';
import { userReducer } from './state/user.reducer';
import { ActivitiesModule } from 'src/features/activities/activities.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    ProfileModule,
    ActivitiesModule,
    SharedModule.forRoot(),
    StoreModule.forRoot({user: userReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
