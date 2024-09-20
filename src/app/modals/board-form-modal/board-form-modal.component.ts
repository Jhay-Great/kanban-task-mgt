import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { createBoard, updateBoard } from '../../state/board/board.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { selectBoard } from '../../state/board/board.selector';
import { ApplicationService } from '../../services/application/application.service';
import { filter, map, Observable, Subscription } from 'rxjs';
import { IBoard } from '../../model/board.interface';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-board-form-modal',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ReactiveFormsModule],
  templateUrl: './board-form-modal.component.html',
  styleUrl: './board-form-modal.component.scss',
})
export class BoardFormModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  boardName!:string;
  boardId!:string;
  columnNames!:string[];
  isEditable:boolean = false;
  subscription!:Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private appService: ApplicationService
  ) {}

  ngOnInit(): void {
    // creates form
    this.isEditable = this.appService.isEditable;
    if (this.appService.isEditable) {
      this.appService.boardFormData$.pipe(
        filter(
          data => data !== null
        ),
        map(
          data => {
            if (data === null) return;
            this.boardId = data.id;
            this.boardName = data.name;
            this.columnNames = data.columns.map(column => column.name)
  
            this.form = this.fb.group({
              name: [this.boardName],
              columns: this.fb.array([]),
            });
            this.columnNames.forEach(name => {
              const status = this.fb.group({
                name: [name, Validators.required]
              });
              (this.form.get('columns') as FormArray).push(status)
              
            })
          }
        )
      ).subscribe();

    }else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        columns: this.fb.array([]),
      });

    }



    
  }

  ngOnDestroy(): void {
    
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
    const form = this.form;
    if (!form.valid) {
      console.log('form is invalid');
      return;
    }

    const board = { ...form.value, id: this.appService.generateId() };
    console.log('logging new board form: ', board);
    this.store.dispatch(createBoard({ board }));
    this.clearForm();
  }

  saveChanges () {
    const form = this.form;
    if (!form.valid) {
      console.log('form is invalid');
      return;
    }

    const update:Update<IBoard> = {id: this.boardId, changes: {
      ...form.value
    }};

    this.store.dispatch(updateBoard({ update }));


    console.log('updated form value: ', update)
  }

  removeModal () {
    console.log('called...')
    this.appService.toggleBoardModal();
  }
}
