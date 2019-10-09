import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../state';
import {getUserRole} from '../../../login/state';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRoles} from '../../../../models/user-roles.model';

@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.css']
})
export class ProjectsHomeComponent implements OnInit {

  constructor(private store$: Store<State>) { }
  isStudent$: Observable<boolean>;

  ngOnInit() {
    this.isStudent$ = this.store$.select(getUserRole).pipe(
      map(role => role === UserRoles.Student)
    );
  }

}
