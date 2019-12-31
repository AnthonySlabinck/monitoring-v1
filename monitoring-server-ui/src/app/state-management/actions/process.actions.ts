import {Action} from '@ngrx/store';

import {Process} from '../../processes/models/process';

export const LOAD_PROCESSES = '[Process] Load Processes';
export const UPDATE_PROCESS = '[Process] Update Process';
export const SELECT_PROCESS = '[Process] Select Process';

export class LoadProcessesAction implements Action {
  readonly type = LOAD_PROCESSES;

  constructor(public payload: { processes: Process[] }) {
  }
}

export class UpdateProcessAction implements Action {
  readonly type = UPDATE_PROCESS;

  constructor(public payload: { process: { id: string, changes: Process } }) {
  }
}

export class SelectProcessAction implements Action {
  readonly type = SELECT_PROCESS;

  constructor(public payload: { id: string }) {
  }
}

export type All =
  LoadProcessesAction
  | UpdateProcessAction
  | SelectProcessAction;
