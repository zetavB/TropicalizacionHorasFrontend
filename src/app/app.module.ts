import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LoginModule } from '../features/login/login.module';
import { ProfileModule } from '../features/profile/profile.module';
import { EffectsModule } from '@ngrx/effects';
import { ActivitiesModule } from 'src/features/activities/activities.module';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import {CustomSerializer, getInitialState, reducers} from './state/router.reducer';
import {TokenInterceptor} from '../core/token-interceptor.service';

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
    ActivitiesModule,
    ProfileModule,
    SharedModule.forRoot(),
    StoreModule.forRoot(reducers, {initialState: getInitialState}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
