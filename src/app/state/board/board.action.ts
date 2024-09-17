import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../model/board.interface';

// initial board data Actions
export const onLoadBoardData = createAction('[Board Api] Load initial data');
export const onLoadBoardSuccess = createAction(
  '[Board Api] Successfully load board data',
  props<{ board: IBoard[] }>()
);
export const onLoadBoardFailure = createAction(
    '[Board Api] Failed to load board data',
    props<{error: string}>(),
)

// CRUD operation Actions
export const createBoard = createAction(
    '[Board Api] Creates a new board',
    props<{board: IBoard}>(),
)
export const deleteBoard = createAction(
    '[Board Api] Deletes a new board',
    props<{id: string}>(),
)
