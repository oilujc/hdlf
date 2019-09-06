import * as fromNote from "../actions/book.actions";
import { Book } from "../interfaces/book";

export interface NoteState {
  data: Book[];
}

export const initialState: NoteState = {
  data: []
};

export function reducer(
  state = initialState,
  action: fromNote.ActionsUnion
): NoteState {
  switch (action.type) {
    case fromNote.ActionTypes.SetBookOne: {
      return {
        ...state,
        data: [...state.data, action.payload.book]
      };
    }

    case fromNote.ActionTypes.SetBookTwo: {
      return {
        ...state,
        ...state.data.splice(state.data.indexOf(action.payload.book), 1)
      };
    }

    default: {
      return state;
    }
  }
}