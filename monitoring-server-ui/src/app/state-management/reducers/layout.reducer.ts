import * as LayoutActions from '../actions/layout.actions';

export interface State {
  showSpinner: boolean;
}

export const initialState: State = {
  showSpinner: true
}

export function reducer(state = initialState, action: LayoutActions.All): State {
  switch (action.type) {
    case LayoutActions.SHOW_SPINNER:
      return {
        showSpinner: true
      };

    case LayoutActions.HIDE_SPINNER:
      return {
        showSpinner: false
      };

    default: {
      return state;
    }
  }
}

export const getShowSpinner = (state: State) => state.showSpinner;
