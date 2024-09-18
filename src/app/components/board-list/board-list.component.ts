import { Component, OnInit } from '@angular/core';
import { AppState } from '../../model/AppState';
import { Store } from '@ngrx/store';
import { selectBoard } from '../../state/board/board.selector';
import { Observable } from 'rxjs';
import { IBoard } from '../../model/board.interface';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { createBoard } from '../../state/board/board.action';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent implements OnInit {

  boards$!: Observable<IBoard[]>
  form!: FormGroup

  constructor (
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {};

  ngOnInit(): void {
    // selects board array
    this.boards$ = this.store.select(selectBoard);

    // creates form
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([]),
    })
  }

  get columnFormArray () {
    return this.form.get('columns') as FormArray;
  }

  createNewColumns () {
    return this.fb.group({
      columns: ['', Validators.required],
    })
  }
  
  addColumns () {
    this.columnFormArray.push(this.createNewColumns());
  }

  removeColumn (index:number) {
    this.columnFormArray.removeAt(index);
  }

  submit() {
    const board = this.form.value;
    this.store.dispatch(createBoard({board}));
  }

  createNewBoard () {
    // console.log('called...')
    // this.store.dispatch(createBoard)
    //     const data = {
    //   name: 'boy',
    //   id: '39sskls3',
    //   columns: [
    //     {
    //       name: 'going out',
    //       tasks: [],
    //     }
    //   ]
    // }
    // this.store.dispatch(createBoard({board: data}));
  }

}
