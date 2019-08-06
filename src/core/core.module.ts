import {NgModule, Optional, SkipSelf} from '@angular/core';
import {TokenService} from './token.service';
import {UserService} from './user.service';

@NgModule({
  providers: [TokenService, UserService]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('No se puede importar CoreModule en otro modulo que no sea AppModule');
    }
  }
}
