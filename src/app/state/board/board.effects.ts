import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BoardService } from "../../services/board.service";
import { onLoadBoardData, onLoadBoardSuccess } from "./board.action";
import { map, mergeMap, tap } from "rxjs";
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardEffect {
    loadBoards$ = createEffect(() => 
        this.actions$.pipe(
            ofType(onLoadBoardData),
            mergeMap(() => 
                this.boardService.fetch().pipe(
                    map(res =>
                        res.boards.map(board =>({
                            ...board,
                            id: uuid()
                        }))
                    ),
                    tap(data => {
                        console.log('logging from tap: ', data)
                    }),
                    map(data => onLoadBoardSuccess({board: data})),
                    // tap(data => {
                    //     console.log(data.boards.map(data => console.log(data)));
                    //     // data.boards[0]
                    // })
                )
            )
        )
    )

    constructor (
        private actions$: Actions,
        private boardService: BoardService,
    ) {};
}