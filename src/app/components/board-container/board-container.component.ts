import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from '../../model/AppState';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from '../../model/board.interface';

@Component({
  selector: 'app-board-container',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './board-container.component.html',
  styleUrl: './board-container.component.scss'
})
export class BoardContainerComponent implements OnInit {

  isEmpty:boolean = false;
  columns!: Observable<IBoard[]>;

  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit(): void {
    this.columns = this.store.select()
  }
}
