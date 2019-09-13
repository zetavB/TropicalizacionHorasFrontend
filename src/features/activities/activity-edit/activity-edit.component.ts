import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivityState } from '../state/activities.reducer';
import { getActivityId, getActivityDetails, getActivityFiles } from '../state';
import { take } from 'rxjs/operators';
import { LoadActivityDetails, UpdateActivity } from '../state/activities.actions';
import { UserService } from 'src/core/user.service';
import { ActivitiesService } from '../activities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Activity} from '../../../models/entities/activity.model';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  constructor(
    private store: Store <ActivityState>,
    private userService: UserService,
    private activitiesService: ActivitiesService,
    private spinner: NgxSpinnerService) { }

  id: number;
  studentEmail: string;
  activity: Activity;
  categories = [];
  projects = [];
  files = [];

  ngOnInit() {
    this.spinner.show();
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

    this.store.pipe(
      select(getActivityFiles)
    ).subscribe(files => this.files = files);

    this.store.select('login').subscribe(state => {
      this.studentEmail = state.tokenInfo.sub;
      this.userService.getStudent(state.tokenInfo.sub).subscribe(student => this.projects = student.proyectos);
    });

    this.activitiesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit(data: {activity: Activity, files: Set<File>, fileURIsToRemove: string[]}) {
    this.spinner.show();
    this.store.dispatch(new UpdateActivity({activity: data.activity, files: data.files, filesToRemove: data.fileURIsToRemove}));
  }
}
