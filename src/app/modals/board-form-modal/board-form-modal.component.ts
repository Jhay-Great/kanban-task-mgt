import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { createBoard } from '../../state/board/board.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { selectBoard } from '../../state/board/board.selector';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  selector: 'app-board-form-modal',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ReactiveFormsModule],
  templateUrl: './board-form-modal.component.html',
  styleUrl: './board-form-modal.component.scss',
})
export class BoardFormModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private appService: ApplicationService
  ) {}

  ngOnInit(): void {
    // selects board array
    // this.boards$ = this.store.select(selectBoard);

    // creates form
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([]),
    });
  }

  get columnFormArray(): FormArray {
    return this.form.get('columns') as FormArray;
  }

  createNewColumns() {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  addColumns() {
    this.columnFormArray.push(this.createNewColumns());
  }

  removeColumn(index: number) {
    this.columnFormArray.removeAt(index);
  }

  clearForm() {
    this.form.reset();
  }

  submit() {
    if (!this.form.valid) {
      console.log('form is invalid');
      return;
    }

    const board = { ...this.form.value, id: this.appService.generateId() };
    console.log('logging new board form: ', board);
    this.store.dispatch(createBoard({ board }));
    this.clearForm();
  }

  removeModal () {
    console.log('called...')
    this.appService.toggleBoardModal();
  }
}
