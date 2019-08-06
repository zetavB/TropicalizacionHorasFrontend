import {LoginState} from '../../features/login/state/login.reducer';
import { UserState } from './user.reducer';

export interface State {
  readonly login: LoginState;
  readonly user: UserState;
}
