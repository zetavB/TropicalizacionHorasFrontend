import { Component, OnInit } from '@angular/core';
import {State} from '../../../app/state/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getUserRole} from '../../login/state';
import {UserRoles} from '../../../models/user-roles.model';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {

  constructor(private store$: Store<State>) { }

  userRole$: Observable<string>;
  coordinatorRole: string = UserRoles.Coordinator;

  ngOnInit() {
    this.userRole$ = this.store$.select(getUserRole);
  }

}
