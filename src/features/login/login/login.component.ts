import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../core/token.service';
import { Store } from '@ngrx/store';
import {LoginState} from '../state/login.reducer';
import {Login, TokenPresent} from '../state/login.actions';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private store: Store<LoginState>,
    private spinner: NgxSpinnerService) { }

  username: string;
  password: string;

  ngOnInit() {
    if (this.tokenService.isTokenPresent()) {
      this.store.dispatch(new TokenPresent(this.tokenService.getToken()));
    }
  }

  login(): void {
    this.spinner.show();
    this.store.dispatch(new Login([this.username, this.password]));
  }
}
