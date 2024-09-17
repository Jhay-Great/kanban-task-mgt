import { Component, OnInit } from '@angular/core';
import { AppState } from '../../model/AppState';
import { Store } from '@ngrx/store';
import { selectBoard } from '../../state/board/board.selector';
import { Observable } from 'rxjs';
import { IBoard } from '../../model/board.interface';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent implements OnInit {

  boards$!: Observable<IBoard[]>

  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit(): void {
    this.boards$ = this.store.select(selectBoard);
  }

}
