import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AppState } from '../../model/AppState';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { IBoard, IColumns } from '../../model/board.interface';
import { selectColumns } from '../../state/board/board.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board-container',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './board-container.component.html',
  styleUrl: './board-container.component.scss'
})
export class BoardContainerComponent implements OnInit, OnDestroy {

  isEmpty:boolean = false;
  columns$!: Observable<IColumns[] | undefined>;
  subscription!: Subscription;

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {};

  ngOnInit(): void {
    // gets the id from the params
    // selects the columns

    this.subscription = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      if (!id) return;
      this.columns$ = this.store.select(selectColumns(id)).pipe(
        map(data => data?.columns)
      );
      this.store.select(selectColumns(id)).subscribe(val => {
        console.log(val?.columns); 
      })
      
    })
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


