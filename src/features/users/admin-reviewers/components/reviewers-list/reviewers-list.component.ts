import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getReviewersPage, getReviewersPageContent, State} from '../../state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../../../../../models/Page';
import {Estudiante} from '../../../../../models/entities/estudiante.model';
import {ChangeReviewersPage, LoadReviewers} from '../../state/reviewer.actions';
import {PageEvent} from '@angular/material/paginator';
import {ReviewerModel} from '../../../../../models/entities/reviewer.model';

@Component({
  selector: 'app-reviewers-list',
  templateUrl: './reviewers-list.component.html',
  styleUrls: ['./reviewers-list.component.css']
})
export class ReviewersListComponent implements OnInit {

  constructor(private store$: Store<State>, private router: Router) { }

  reviewersPage$: Observable<Page<ReviewerModel>>;
  reviewers$: Observable<ReviewerModel[]>;

  displayedColumns: string[] = ['email', 'name', 'lastN1', 'lastN2', 'coordinator'];

  ngOnInit() {
    this.reviewersPage$ = this.store$.select(getReviewersPage);
    this.reviewers$ = this.store$.select(getReviewersPageContent);

    this.store$.dispatch(new LoadReviewers());
  }

  getNewPage($event: PageEvent) {
    this.store$.dispatch(new ChangeReviewersPage($event.pageSize, $event.pageIndex));
  }

}
