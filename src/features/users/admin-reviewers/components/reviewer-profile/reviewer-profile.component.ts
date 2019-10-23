import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getSelectedReviewer, State} from '../../state';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../../core/user.service';
import {takeWhile} from 'rxjs/operators';
import {AddReviewer, DeleteReviewer, EditReviewer, SelectReviewer} from '../../state/reviewer.actions';
import {Usuario} from '../../../../../models/entities/usuario.model';
import {getUserRole} from '../../../../login/state';
import {Observable} from 'rxjs';
import {UserRoles} from '../../../../../models/user-roles.model';
import {ReviewerModel} from '../../../../../models/entities/reviewer.model';

@Component({
  selector: 'app-reviewer-profile',
  templateUrl: './reviewer-profile.component.html',
  styleUrls: ['./reviewer-profile.component.css']
})
export class ReviewerProfileComponent implements OnInit, OnDestroy {

  constructor(private store$: Store<State>,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  alive = true;
  editing = false;
  adding = false;
  reviewer: ReviewerModel = null;
  userRole$: Observable<string>;
  coordinatorRole = UserRoles.Coordinator;

  reviewerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(8), Validators.minLength(8)]],
    name: ['', [Validators.required, Validators.pattern('[a-z A-ZáéíóúÁÉÍÓÚ]+')]],
    lastNames: ['', [Validators.required, Validators.pattern('[a-z A-ZáéíóúÁÉÍÓÚ]+')]],
    coordinator: ['']
  });

  get email() {
    return this.reviewerForm.get('email');
  }
  get phone() {
    return this.reviewerForm.get('phone');
  }
  get name() {
    return this.reviewerForm.get('name');
  }
  get lastNames() {
    return this.reviewerForm.get('lastNames');
  }
  get coordinator() {
    return this.reviewerForm.get('coordinator');
  }

  ngOnInit() {
    this.reviewerForm.disable();

    this.route.paramMap.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: ParamMap) => {
        if (params.get('correo') !== 'agregar') {
          this.store$.dispatch(new SelectReviewer(params.get('correo')));
        } else {
          this.adding = true;
          this.reviewerForm.enable();
        }
      }
    );

    this.store$.select(getSelectedReviewer).subscribe((reviewer: ReviewerModel) => {
      if (!this.adding) {
        this.reviewer = reviewer;
        if (reviewer !== undefined) {
          this.showReviewer();
        } else {
          this.router.navigate(['/usuarios']);
        }
      }
    });

    this.userRole$ = this.store$.select(getUserRole);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  public startEditing(): void {
    this.editing = true;
    this.reviewerForm.enable();
  }
  public stopEditing(): void {
    this.editing = false;
    this.reviewerForm.disable();
    this.showReviewer();
  }

  private showReviewer(): void {
    this.email.setValue(this.reviewer.usuario.correo);
    this.name.setValue(this.reviewer.usuario.nombre);
    this.phone.setValue(this.reviewer.usuario.telefono);
    this.lastNames.setValue(this.reviewer.usuario.apellidos);
    this.coordinator.setValue(this.reviewer.esCoordinador);
  }

  public editReviewer(): void {
    const newReviewer = {
      usuario: {
        correo: this.email.value,
        nombre: this.name.value,
        apellidos: this.lastNames.value,
        telefono: this.phone.value,
        activado: true
      } as Usuario,
      esCoordinador: this.coordinator.value
    } as ReviewerModel;
    this.store$.dispatch(new EditReviewer(newReviewer));
    this.stopEditing();
  }

  deleteReviewer() {
    this.store$.dispatch(new DeleteReviewer(this.email.value));
  }

  addReviewer() {
    this.store$.dispatch(new AddReviewer( {
      usuario: {
        correo: this.email.value,
        nombre: this.name.value,
        apellidos: this.lastNames.value,
        telefono: this.phone.value,
        activado: true
      } as Usuario,
      esCoordinador: this.coordinator.value
    } as ReviewerModel));
  }

}
