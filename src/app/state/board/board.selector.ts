import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../model/AppState";
import { boardAdapter, BoardState } from "./board.reducer";
import { IBoard } from "../../model/board.interface";

const {selectAll, selectIds, selectEntities, selectTotal} = boardAdapter.getSelectors();

// const featureBoard = (state:AppState) => state.boards;
const featureBoard = createFeatureSelector<AppState, BoardState>('boards');

export const selectBoard = createSelector(
    featureBoard,
    selectAll,
    // (featureBoard) => featureBoard
);

// export const selectBoard = createSelector(
//     featureBoard,
//     (featureBoard) => {
//         return featureBoard;
//     }
// )