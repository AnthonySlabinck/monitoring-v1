import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {Process} from "../../processes/models/process";
import * as ProcessActions from '../actions/process.actions';

export interface State extends EntityState<Process> {
  loaded: boolean;
  selectedProcessId: string;
}

export function sortByNumberOfFailedMessages(a: Process, b: Process): number {
  return b.failedMessages.length - a.failedMessages.length;
}

export const adapter: EntityAdapter<Process> = createEntityAdapter<Process>({
  sortComparer: sortByNumberOfFailedMessages,
  selectId: (process: Process) => process.id
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  selectedProcessId: null
});

export function reducer(state = initialState, action: ProcessActions.All): State {
  switch (action.type) {
    case ProcessActions.LOAD_PROCESSES: {
      return {
        ...adapter.addAll(action.payload.processes, state),
        loaded: true
      };
    }

    case ProcessActions.UPDATE_PROCESS: {
      return adapter.updateOne(action.payload.process, state);
    }

    case ProcessActions.SELECT_PROCESS: {
      return {
        ...state,
        selectedProcessId: action.payload.id
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getSelectedId = (state: State) => state.selectedProcessId;

