import { Action } from "@ngrx/store";
import { Book } from "../interfaces/book";

export enum ActionTypes {
  SetBookOne = "[Notes Service] Create note",
  SetBookTwo = "[Notes Service] Delete note"
}

export class SetBookOne implements Action {
  readonly type = ActionTypes.SetBookOne;

  constructor(public payload: { book: Book }) {}
}

export class SetBookTwo implements Action {
  readonly type = ActionTypes.SetBookTwo;

  constructor(public payload: { book: Book }) {}
}

export type ActionsUnion = SetBookOne | SetBookTwo;