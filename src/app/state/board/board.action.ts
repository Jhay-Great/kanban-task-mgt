import { createAction, props } from "@ngrx/store";
import { IBoard, ISubBoard } from "../../model/board.interface";

export const onLoadBoardData = createAction(
    '[Board Api] Load initial data',
);
export const onLoadBoardSuccess = createAction(
    '[Board Api] Successfully load board data',
    props<{boards: ISubBoard[]}>(),
)