import { createReducer, on } from "@ngrx/store";
import { IBoard } from "../../model/board.interface";
import { onLoadBoardData, onLoadBoardSuccess } from "./board.action";

const initialValue:IBoard = {
    boards: [],
}

export const boardReducer = createReducer(
    initialValue,
    on(onLoadBoardData, (state) => state),
    on(onLoadBoardSuccess, (state, {boards}) => ({ ...state, boards})),
)
