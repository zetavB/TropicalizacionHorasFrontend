import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Store } from '@ngrx/store';
import { UserService } from 'src/core/user.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.scss']
})
export class ActivityRegisterComponent implements OnInit {

  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService,
    private store: Store <{email: string, rol: string}>,
    private fb: FormBuilder
  ) { }

  categories = [];
  projects = [];
  activityForm = this.fb.group({
    project: ['', Validators.required],
    category: ['', Validators.required],
    hours: ['', [Validators.required, Validators.pattern('[0-9]{1,3}')]],
    date: ['', Validators.required],
    details: ['']
  });

  ngOnInit() {
    this.store.select('login').subscribe(state =>
      this.userService.getStudent(state.tokenInfo.sub).subscribe(student => this.projects = student.proyectos));
    this.activitiesService.getCategories().subscribe(categories => this.categories = categories);
  }

  addActivity() {
    console.log(this.activityForm.value);
  }
}
