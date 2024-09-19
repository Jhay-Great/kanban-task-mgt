import { createAction, props } from '@ngrx/store';
import { IBoard, IColumns, ITask } from '../../model/board.interface';
import { Update } from '@ngrx/entity';

// load initial board data Actions
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

// gets a specific board
export const selectedBoard = createAction(
    '[Board Api] Selects a single board',
    props<{id: string}>(),
)

// creates a task action
export const createTask = createAction(
    '[Board Api] Creates a task',
    props<{task: ITask}>(),
)

export const updateBoard = createAction(
    '[Board Api] Updates board',
    props<{update: Update<IColumns[]>}>(),
)