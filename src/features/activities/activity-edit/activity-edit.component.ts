import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/models/activity.model';
import { Store, select } from '@ngrx/store';
import { ActivityState } from '../state/activities.reducer';
import { getActivityId, getActivity, getActivityDetails } from '../state';
import { take } from 'rxjs/operators';
import { LoadActivityDetails, UpdateActivity } from '../state/activities.actions';
import { UserService } from 'src/core/user.service';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  constructor(
    private store: Store <ActivityState>,
    private userService: UserService,
    private activitiesService: ActivitiesService) { }

  id: number;
  studentEmail: string;
  activity: Activity;
  categories = [];
  projects = [];
  files = [];

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

    this.store.select('login').subscribe(state => {
      this.studentEmail = state.tokenInfo.sub;
      this.userService.getStudent(state.tokenInfo.sub).subscribe(student => this.projects = student.proyectos);
    });

    this.activitiesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit(activity: Activity) {
    this.store.dispatch(new UpdateActivity(activity));
  }
}
