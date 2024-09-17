import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from './services/board.service';
import { AppState } from './model/AppState';
import { Store } from '@ngrx/store';
import { selectBoard } from './state/board/board.selector';
import { createBoard, onLoadBoardData } from './state/board/board.action';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardContainerComponent } from './components/board-container/board-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, SidebarComponent, BoardContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'kanban';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(onLoadBoardData()),
      this.store
        .select(selectBoard)
        .subscribe((value) => console.log('boards: ', value));
    

    // const data = {
    //   name: 'something',
    //   id: '39sskls3',
    //   columns: [
    //     {
    //       name: 'going out',
    //       tasks: [],
    //     }
    //   ]
    // }
    // this.store.dispatch(createBoard({board: data}));
    // this.store.select(selectBoard).subscribe(val => console.log('second log: ', val));
  }
}
