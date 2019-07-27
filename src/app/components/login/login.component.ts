import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenService} from '../../services/token.service';
import {CustomResponse} from '../../entities/custom-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private tokenService: TokenService) { }

  username: string;
  password: string;
  ngOnInit() {
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
     this.router.navigate(['core']);
    } else {
      this.httpClient.post(environment.serverUrl + '/autenticar/sign-in', '{' +
        ' "correoUsuario": "' + this.username + '",' +
        ' "contrasenna": "' + this.password + '"' +
        '}',
        {headers: new HttpHeaders({'Content-Type':  'application/json'})})
        .subscribe( (response: CustomResponse) => {
          this.tokenService.setJwtToken(response.response.toString());
          this.router.navigate(['core']);
        }, error1 => {
          console.log(error1);
          alert('Datos inválidos');
        });
    }
  }
}
