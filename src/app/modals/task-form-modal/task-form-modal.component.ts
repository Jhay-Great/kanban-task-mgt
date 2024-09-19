import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { ActivatedRoute } from '@angular/router';
import { selectColumns } from '../../state/board/board.selector';
import { map, Observable, tap } from 'rxjs';
import { ApplicationService } from '../../services/application/application.service';
import { IColumns, ITask } from '../../model/board.interface';
import { AsyncPipe } from '@angular/common';
import { updateBoard } from '../../state/board/board.action';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss'
})
export class TaskFormModalComponent implements OnInit, OnDestroy {

  taskForm!: FormGroup;
  boardIsActive:boolean = false;
  boardStatus$!: Observable<IColumns[] | undefined>;

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService,
  ) {};

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      subtask: this.fb.array([]),
      status: [''],
      // status: this.fb.array([]),
    });

    // getting the columns from the board
    this.boardStatus$ = this.appService.selectedBoard$.pipe(
      map(data => data?.columns)
    )
    

  }

  ngOnDestroy(): void {
    
  }

  get subTaskArray () {
    return this.taskForm.get('subtask') as  FormArray;
  }

  // get statusArray () {
  //   return this.taskForm.get('status') as FormArray;
  // }

  addSubTask (): void {
    const element = this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false],
    })
    this.subTaskArray.push(element)
  }
  
  clear ():void {
    this.taskForm.reset();
  }

  removeSubTask (index:number) {
    this.subTaskArray.removeAt(index)
  }

  createTask () {
    const form = this.taskForm;
    if (form.invalid) {
      console.log('invalid form')
      return;
    };

    const data = form.value;
    // console.log('incoming data: ', data);
    this.appService.selectedBoard$.subscribe(
      board => {
        const boards = board?.columns.map(column => {
          // console.log(board);
          if (column.name === data.status) {
            const updatedColumn:IColumns = { ...column, tasks: [...column.tasks, data] };
            // console.log(updatedColumn); // This will log the modified column
            return updatedColumn; // Return the modified column
          }
          return column; // Return the original column if no match
        });
        
        

        if (!board || !boards) return;

        const update: Update<IColumns[]> = {
          id: board.id,
          changes: boards, 
        }

        if (!update) return;

        // console.log('data to be dispatched: ', update);

        // console.log(up)
        
        // dispatch action and payload
        this.store.dispatch(updateBoard({update}))
      }
    )


  }


}
