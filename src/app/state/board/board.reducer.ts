import { createReducer, on } from '@ngrx/store';
import { IBoard } from '../../model/board.interface';
import { createBoard, deleteBoard, onLoadBoardData, onLoadBoardSuccess, updateBoard } from './board.action';

// entities
/**
 createEntityAdapter is part of the ngrx entity package that helps you create an adapter. 
 adapters are methods that are used to manage your entity collections.
 addOne, removeOne, are examples of some adapters
 *  */
import { createEntityAdapter } from '@ngrx/entity';

/**
 * EntityState is an interface provided by ngrx entities to used to define the structure of your data
 * It provides you with an object with properties : id, entities
 */
import { EntityState } from '@ngrx/entity';

// creating an adapter
export const boardAdapter = createEntityAdapter<IBoard>();

// creating an entity interface
export interface BoardState extends EntityState<IBoard> {}

// creates an initial state using the entity adapter
export const initialBoard: BoardState = boardAdapter.getInitialState({});

export const boardReducer = createReducer(
  initialBoard,
  on(onLoadBoardData, (state) => state),
  on(onLoadBoardSuccess, (state, { board }) =>
    boardAdapter.setAll(board, state)
  ),
  on(createBoard, (state, {board}) => (console.log('called...'), boardAdapter.addOne(board, state))),
  on(deleteBoard, (state, { id }) => boardAdapter.removeOne(id, state)),
  on(updateBoard, (state, { update }) => boardAdapter.updateOne(update, state)),
);
