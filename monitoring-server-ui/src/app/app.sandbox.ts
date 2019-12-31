import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from './state-management/reducers/root.reducer';
import {AppState} from './state-management/reducers/root.reducer';
import {HideSpinnerAction, ShowSpinnerAction} from './state-management/actions/layout.actions';

@Injectable()
export class AppSandbox {
  showSpinner$ = this.store.select(fromRoot.getShowSpinner);

  constructor(private store: Store<AppState>) {
  }

  showSpinner(): void {
    this.store.dispatch(new ShowSpinnerAction());
  }

  hideSpinner(): void {
    this.store.dispatch(new HideSpinnerAction());
  }

}
