import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  UPDATE_USER = 'UPDATE_USER',
  REMOVE_USER = 'REMOVE_USER'
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: {email: string, rol: string}) {}
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.REMOVE_USER;
  constructor(public payload: string) {}
}

export type Actions = UpdateUser | RemoveUser;
