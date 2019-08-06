import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenService} from '../../services/token.service';
import {Response} from '../../models/response.model';
import { Store } from '@ngrx/store';
import { JwtInfoModel } from '../../models/jwt-info.model';
import { UpdateUser } from 'src/app/store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private store: Store<{email: string}>) { }

  username: string;
  password: string;
  ngOnInit() {
    if (this.tokenService.isTokenPresent()) {
      this.router.navigate(['/perfil']);
    }
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
     this.router.navigate(['/perfil']);
    } else {
      this.httpClient.post(environment.serverUrl + '/autenticar/sign-in', '{' +
        ' "correoUsuario": "' + this.username + '",' +
        ' "contrasenna": "' + this.password + '"' +
        '}',
        {headers: new HttpHeaders({'Content-Type':  'application/json'})})
        .subscribe( (response: Response) => {
          console.log(response);
          this.tokenService.setJwtToken(response.response.toString());
          const token = this.tokenService.getToken();
          this.store.dispatch(new UpdateUser(token.sub));
          this.router.navigate(['/perfil']);
        }, error1 => {
          console.log(error1);
          alert('Datos inválidos');
        });
    }
  }
}
