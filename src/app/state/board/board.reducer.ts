import { createReducer, on } from "@ngrx/store";
import { IBoard } from "../../model/board.interface";
import { onLoadBoardData, onLoadBoardSuccess } from "./board.action";

// entities
/**
 createEntityAdapter is part of the ngrx entity package that helps you create an adapter. 
 adapters are methods that are used to manage your entity collections.
 addOne, removeOne, are examples of some adapters
 *  */
import { createEntityAdapter } from "@ngrx/entity";

/**
 * EntityState is an interface provided by ngrx entities to used to define the structure of your data
 * It provides you with an object with properties : id, entities
 */
import { EntityState } from "@ngrx/entity";


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
