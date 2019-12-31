import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromLayout from '../reducers/layout.reducer';
import * as fromProcess from '../reducers/process.reducer';

export interface AppState {
  layout: fromLayout.State;
  processes: fromProcess.State;
}

export const reducers: ActionReducerMap<AppState> = {
  layout: fromLayout.reducer,
  processes: fromProcess.reducer
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSpinner = createSelector(
  getLayoutState,
  fromLayout.getShowSpinner
)

export const getProcessState = createFeatureSelector<fromProcess.State>('processes');

export const getLoaded = createSelector(
  getProcessState,
  fromProcess.getLoaded
);

export const getSelectedProcessId = createSelector(
  getProcessState,
  fromProcess.getSelectedId
);

export const {
  selectEntities: getProcessEntities,
  selectAll: getAllProcesses
} = fromProcess.adapter.getSelectors(getProcessState);

export const getSelectedProcess = createSelector(
  getProcessEntities,
  getSelectedProcessId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
