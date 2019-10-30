import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSortable } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State } from '../../app/state/state';
import {getTokenInfo, getUserRole} from '../login/state';
import { DialogComponent } from 'src/shared/components/dialog/dialog.component';
import { JwtInfoModel } from 'src/models/jwt-info.model';
import {map, take, tap} from 'rxjs/operators';
import {LoadActivity, DeleteActivity, ChangeShowDeclined, ChangeShowPending, ChangeShowAccepted} from './state/activities.actions';
import {getActivity, getShowAccepted, getShowDeclined, getShowPending} from './state';
import { NgxSpinnerService } from 'ngx-spinner';
import {Activity} from '../../models/entities/activity.model';
import {Observable} from 'rxjs';
import {UserRoles} from '../../models/user-roles.model';

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

  role$: Observable<string>;
  showAccepted$: Observable<boolean>;
  showDeclined$: Observable<boolean>;
  showPending$: Observable<boolean>;

  displayedColumns: string[] = ['fecha', 'horas', 'proyecto', 'categoria', 'estado', 'detalles'];
  data = [];
  dataSource = new MatTableDataSource<Activity>(this.data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.spinner.show();
    this.dataSource.paginator = this.paginator;
    this.sort.sort(({ id: 'fecha', start: 'desc'}) as MatSortable);
    this.dataSource.sort = this.sort;

    this.showAccepted$ = this.store.select(getShowAccepted);
    this.showDeclined$ = this.store.select(getShowDeclined);
    this.showPending$ = this.store.select(getShowPending);

    this.store.pipe(
      select(getTokenInfo),
      take(1)
    ).subscribe((info: JwtInfoModel) => info !== null ? this.store.dispatch(new LoadActivity(info.sub)) : null);

    this.store.select(getActivity).subscribe(activities => {
      this.dataSource.data = activities;
    });

    this.role$ = this.store.pipe(
      select(getUserRole),
      tap(role => {
        // tslint:disable-next-line:no-unused-expression
        if (role !== UserRoles.Student) {
          this.displayedColumns = ['correo', ...this.displayedColumns];
        }
      })
    );
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

  changeDeclined() {
    this.store.dispatch(new ChangeShowDeclined());
  }

  changePending() {
    this.store.dispatch(new ChangeShowPending());
  }

  changeAccepted() {
    this.store.dispatch(new ChangeShowAccepted());
  }
}
