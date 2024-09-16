import { createSelector } from "@ngrx/store";
import { AppState } from "../../model/AppState";

const featureBoard = (state:AppState) => state.boards;

export const selectBoard = createSelector(
    featureBoard,
    (featureBoard) => {
        return featureBoard;
    }
)