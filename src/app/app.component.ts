import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from './services/board.service';
import { AppState } from './model/AppState';
import { Store } from '@ngrx/store';
import { selectBoard } from './state/board/board.selector';
import { onLoadBoardData } from './state/board/board.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'kanban';

  constructor (
    private boardService: BoardService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.boardService.fetch().subscribe(
    //   value => [value].map(v => console.log(v))
    //   // value => value.map(v => console.log(v))
    //   // val => console.log(val),
    // )
    this.store.dispatch(onLoadBoardData()),
    this.store.select(selectBoard).subscribe(
      value => console.log('boards: ', value),
    )
  }
}
