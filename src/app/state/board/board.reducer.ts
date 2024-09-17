import { createReducer, on } from "@ngrx/store";
import { IBoard } from "../../model/board.interface";
import { onLoadBoardData, onLoadBoardSuccess } from "./board.action";

const initialValue:IBoard[] = []

// const initialValue:IBoard[] = {
//     name: '',
//     columns: [],
//     // data: { boards: [] },
//     // loading: false,
//     // error: ''

// }

export const boardReducer = createReducer(
    initialValue,
    on(onLoadBoardData, (state) => state),
    on(onLoadBoardSuccess, (state, {board}) => {
        // const boards = {board}
        console.log('reducer: ', board);
        return board;
    }),
    // on(onLoadBoardSuccess, (state, {data}) => ({ ...state, data})),
)
