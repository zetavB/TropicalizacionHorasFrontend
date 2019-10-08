import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  getProjectAddStudentsContent,
  getProjectAddStudentsPage,
  getProjectAddStudentsSelected,
  getProjectAddStudentsSelectedExist,
  State
} from '../../state';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {
  AddStudentsToProject,
  DeselectStudent,
  LoadProjectNotStudents,
  ProjectNotStudentsChangePage,
  SelectProject,
  SelectStudent
} from '../../state/projects.actions';
import {select, Store} from '@ngrx/store';
import {map, takeWhile, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Estudiante} from '../../../../models/entities/estudiante.model';
import {Page} from '../../../../models/Page';
import {MatCheckboxChange, PageEvent} from '@angular/material';
import {StudentToAddModel} from './student-to-add.model';

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

  displayedColumns: string[] = ['email', 'name', 'lastN1', 'lastN2', 'select', 'carne'];

  alive = true;
  studentsPage$: Observable<Page<Estudiante>>;
  students$: Observable<StudentToAddModel[]>;
  private selectedExist$: Observable<boolean>;

  ngOnInit() {
    this.route.paramMap.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: ParamMap) => {
        this.store$.dispatch(new LoadProjectNotStudents(params.get('nombre')));
        this.store$.dispatch(new SelectProject(params.get('nombre')));
      }
    );

    this.studentsPage$ = this.store$.select(getProjectAddStudentsPage);
    this.students$ = this.store$.select(getProjectAddStudentsContent);
    this.selectedExist$ = this.store$.select(getProjectAddStudentsSelectedExist);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getNewPage(newPage: PageEvent) {
    this.store$.dispatch(new ProjectNotStudentsChangePage(newPage.pageIndex, newPage.pageSize));
  }

  chooseStudent(decision: MatCheckboxChange, chosenStudent: Estudiante) {
      this.store$.dispatch(decision.checked ?
        new SelectStudent(chosenStudent)
        :
        new DeselectStudent(chosenStudent)
      );
  }

  addStudents() {
    this.store$.dispatch(new AddStudentsToProject());
  }
}
