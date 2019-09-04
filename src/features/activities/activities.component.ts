import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/models/activity.model';
import { Store, select } from '@ngrx/store';
import { State } from '../../app/state/state';
import { getTokenInfo } from '../login/state';
import { DialogComponent } from 'src/shared/components/dialog/dialog.component';
import { JwtInfoModel } from 'src/models/jwt-info.model';
import { take } from 'rxjs/operators';
import { LoadActivity, DeleteActivity } from './state/activities.actions';
import { getActivity } from './state';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {

  constructor(
    private store: Store <State>,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  displayedColumns: string[] = ['fecha', 'horas', 'proyecto', 'categoria', 'estado', 'detalles'];
  data = [];
  dataSource = new MatTableDataSource<Activity>(this.data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.spinner.show();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.store.pipe(
      select(getTokenInfo),
      take(1)
    ).subscribe((info: JwtInfoModel) => this.store.dispatch(new LoadActivity(info.sub)));

    this.store.select(getActivity).subscribe(activities => {
      this.dataSource.data = activities;
    });
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {title: 'Eliminar actividad', content: '¿Desea eliminar esta actividad?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteActivity(id));
      }
    });
  }
}
