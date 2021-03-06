import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginState} from '../../../features/login/state/login.reducer';
import {select, Store} from '@ngrx/store';
import {getIsLoggedIn} from '../../../features/login/state';
import {takeWhile} from 'rxjs/operators';
import {TokenPresent} from '../../../features/login/state/login.actions';
import {TokenService} from '../../../core/token.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements  OnInit, OnDestroy {
  drawerVisible = false;
  alive = true;

  constructor(private store: Store<LoginState>, private tokenService: TokenService) {}

  ngOnInit(): void {

    this.store.pipe(
      select(getIsLoggedIn),
      takeWhile(() => this.alive)
    ).subscribe((value: boolean) => this.drawerVisible = value);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
