import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { boardAdapter, BoardState } from './board.reducer';

const { selectAll, selectIds, selectEntities, selectTotal } =
  boardAdapter.getSelectors();

const featureBoard = createFeatureSelector<AppState, BoardState>('boards');

export const selectBoard = createSelector(featureBoard, selectAll);
// dispatch an action with the id and select the entity collection or the board based on the id dispatched to the store
export const selectColumns = (id:string) => createSelector(
  featureBoard, 
  (featureBoard) => featureBoard.entities[id]
)
