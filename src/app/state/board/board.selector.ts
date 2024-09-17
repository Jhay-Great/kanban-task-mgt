import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { boardAdapter, BoardState } from './board.reducer';

const { selectAll, selectIds, selectEntities, selectTotal } =
  boardAdapter.getSelectors();

const featureBoard = createFeatureSelector<AppState, BoardState>('boards');

export const selectBoard = createSelector(featureBoard, selectAll);
