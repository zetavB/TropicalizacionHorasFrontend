import {Component, OnDestroy, OnInit} from '@angular/core';
import {getProjectAddStudentsContent, State} from '../../state';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LoadProjectNotStudents, SelectProject} from '../../state/projects.actions';
import {Store} from '@ngrx/store';
import {takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Estudiante} from '../../../../models/entities/estudiante.model';

@Component({
  selector: 'app-add-student-to-project',
  templateUrl: './add-students-to-project.component.html',
  styleUrls: ['./add-students-to-project.component.css']
})
export class AddStudentsToProjectComponent implements OnInit, OnDestroy {

  constructor(
    private store$: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  alive = true;
  students$: Observable<Estudiante[]>;

  ngOnInit() {
    this.route.paramMap.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: ParamMap) =>
      this.store$.dispatch(new LoadProjectNotStudents(params.get('nombre')))
    );

    this.students$ = this.store$.select(getProjectAddStudentsContent);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
