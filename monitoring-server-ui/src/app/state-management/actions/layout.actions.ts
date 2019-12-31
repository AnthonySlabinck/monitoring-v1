import {Action} from '@ngrx/store';

export const SHOW_SPINNER = '[Layout] Show Spinner';
export const HIDE_SPINNER = '[Layout] Hide Spinner';

export class ShowSpinnerAction implements Action {
  readonly type = SHOW_SPINNER;
}

export class HideSpinnerAction implements Action {
  readonly type = HIDE_SPINNER;
}

export type All = ShowSpinnerAction | HideSpinnerAction;
