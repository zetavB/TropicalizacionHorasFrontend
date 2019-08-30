import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/models/activity.model';
import { Store, select } from '@ngrx/store';
import { ActivityState } from '../state/activities.reducer';
import { getActivityId, getActivity, getActivityDetails } from '../state';
import { take } from 'rxjs/operators';
import { LoadActivityDetails } from '../state/activities.actions';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  constructor(
    private store: Store <ActivityState>) { }

  id: number;
  studentEmail: string;
  activity: Activity;

  ngOnInit() {
    this.store.pipe(
      select(getActivityId),
      take(1),
    ).subscribe((id: number) => {
      this.store.dispatch(new LoadActivityDetails(id));
      this.id = id;
    });

    this.store.pipe(
      select(getActivityDetails)
    ).subscribe(activity => this.activity = activity);
  }

  onSubmit(activity: Activity) {
    console.log(this.id);
    console.log(activity);
  }
}
