import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Activity } from 'src/models/activity.model';
import { ActivitiesService } from './activities.service';
import { Store } from '@ngrx/store';
import {State} from '../../app/state/state';
import {getTokenInfo} from '../login/state';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {

  constructor(
    private activitiesService: ActivitiesService,
    private store: Store <State>
  ) { }

  displayedColumns: string[] = ['fecha', 'horas', 'proyecto', 'categoria', 'estado', 'detalles'];
  data = [];
  dataSource = new MatTableDataSource<Activity>(this.data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.select(getTokenInfo).subscribe(user => this.getActivities(user.sub));
  }

  getActivities(email: string) {
    this.activitiesService.getActivities(email).subscribe(activities => this.dataSource.data = activities);
  }
}
