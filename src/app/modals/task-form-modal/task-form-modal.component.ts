import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { ActivatedRoute } from '@angular/router';
import { selectColumns } from '../../state/board/board.selector';
import { map, Observable, take, tap } from 'rxjs';
import { ApplicationService } from '../../services/application/application.service';
import { IBoard, IColumns, ITask } from '../../model/board.interface';
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
  

  createTask() {
    const form = this.taskForm;
    if (form.invalid) {
      console.log('invalid form');
      return;
    }
  
    const data = form.value;
    
    this.appService.selectedBoard$.pipe(take(1)).subscribe(board => {
      if (!board) return; // returning if board undefined
  
      const boards = board.columns.map(column => {
        console.log('select board data: ', column);
        if (column.name === data.status) {
          // return { ...column, tasks: [...column?.tasks, data] }; // Update the column with the new task
          return {
            ...column,
            tasks: column.tasks ? [...column.tasks, data] : [data]  // If `tasks` exists, add to it; otherwise, initialize with `data`
          };
          
        }
        return column; 
      });
      
      const updatedBoard: IBoard = {
        ...board,
        columns: boards,
      };
  
      const update: Update<IBoard> = {
        id: board.id, 
        changes: updatedBoard, 
      };
      
      this.store.dispatch(updateBoard({ update }));
    });
  }

  removeModal () {
    console.log('called...')
    this.appService.toggleTaskModal();
  }
  


}
