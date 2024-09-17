import { createAction, props } from "@ngrx/store";
import { IBoard, } from "../../model/board.interface";

export const onLoadBoardData = createAction(
    '[Board Api] Load initial data',
);
export const onLoadBoardSuccess = createAction(
    '[Board Api] Successfully load board data',
    props<{board: IBoard[]}>(),
    // props<{boards: ISubBoard[]}>(),
)