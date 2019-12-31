import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../state-management/reducers/root.reducer';
import {AppState} from '../state-management/reducers/root.reducer';
import {
  LoadProcessesAction,
  SelectProcessAction,
  UpdateProcessAction
} from '../state-management/actions/process.actions';
import {ProcessService} from './services/process.service';

@Injectable()
export class ProcessesSandbox {
  processes$ = this.store.select(fromRoot.getAllProcesses);
  selectedProcess$ = this.store.select(fromRoot.getSelectedProcess);

  constructor(private store: Store<AppState>, private processService: ProcessService) {
  }

  getProcesses(): void {
    console.log('ProcessesSandbox#getProcesses');
    this.processService.getProcesses()
      .subscribe(processes => this.store.dispatch(new LoadProcessesAction({processes: processes})));
  }

  selectProcess(id: string) {
    console.log('ProcessesSandbox#selectProcess');
    this.store.dispatch(new SelectProcessAction({id: id}));
  }

  getProcess(id: string): void {
    console.log('ProcessesSandbox#getProcess');
    this.processService.getProcess(id)
      .subscribe(process => this.store.dispatch(new UpdateProcessAction({
        process: {
          id: process.id,
          changes: process
        }
      })));
  }

}
