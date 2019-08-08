import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Activity } from 'src/models/activity.model';
import { ActivitiesService } from './activities.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {

  constructor(
    private activitiesService: ActivitiesService,
    private store: Store <{email: string, rol: string}>
  ) { }

  displayedColumns: string[] = ['fecha', 'horas', 'proyecto', 'categoria', 'estado', 'detalles'];
  data = [];
  dataSource = new MatTableDataSource<Activity>(this.data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.select('user').subscribe(user => this.getActivities(user.email));
  }

  getActivities(email: string) {
    this.activitiesService.getActivities(email).subscribe(activities => this.dataSource.data = activities);
  }
}
