import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { ActivatedRoute } from '@angular/router';
import { selectColumns } from '../../state/board/board.selector';
import { combineLatest, filter, map, Observable, take, tap } from 'rxjs';
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
  isTaskEditable:boolean = false;
  boardStatus$!: Observable<IColumns[] | undefined>;

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService,
  ) {};

  ngOnInit(): void {
    this.boardStatus$ = this.appService.selectedBoard$.pipe(
      map(data => data?.columns)
    )

    this.isTaskEditable = this.appService.getEditState();
    
    if (this.isTaskEditable) {
      this.appService.taskDetail$.pipe(
        filter(task => task !== null),
        map(task => {
          if (task === null) return;
          this.taskForm = this.fb.group({
            title: [task.title], 
            description: [task.description],
            status: [task.status],
            subtasks: this.fb.array([]),
          })

          console.log('logging task: ', task);

          task.subtasks?.forEach(subtask => 
          (this.taskForm.get('subtasks') as FormArray).push(
            this.fb.group({
              title: [subtask.title],
              isCompleted: [subtask.isComplete],
            })
          )
          )

        }

          
        )
      ).subscribe();
    } else {
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        subtasks: this.fb.array([]),
        status: [''],
      });
    }
    

  }

  ngOnDestroy(): void {
    
  }

  get subTaskArray () {
    return this.taskForm.get('subtasks') as  FormArray;
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
          return {
            ...column,
            tasks: column.tasks ? [...column.tasks, data] : [data]  // Update the column with the new task also creates the tasks property if it doesn't exists
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

  cancelModal () {
    this.appService.hideTaskEditableForm();
  }

  saveChanges () {
    const taskForm = this.taskForm;
    
    if (taskForm.invalid) {
      console.log('invalid form');
      return;
    }
    
    const data = taskForm.value;
    console.log(data);

    const initialTask = this.appService.taskDetail$;
    const boardData = this.appService.selectedBoard$;

    combineLatest([boardData, initialTask]).pipe(
      take(1),
      filter(([board, task]) => (board !== null || task !== null)),
      map(([boardData, task]) => {
        if (boardData === null || task === null) return;
        const { id } = boardData;
        const { name } = boardData;
        const columns = boardData.columns.map(column => {
          return { 
            ...column,
            // removes the selected task from the task array
            tasks: column.tasks.filter(taskDetail => (
              taskDetail.title !== task.title
            )),
            
           }
        })
        // create the new board here
        // const updatedBoard = {
        //   id,
        //   name,
        //   column,
        // }
        const updatedBoard = {
          id,
          name,
          columns, 
        }
        console.log('updated board: ', updatedBoard);

        // inserts the new data into the board
        const newBoard = {
          ...updatedBoard,
          // columns: updateBoard
          columns: updatedBoard.columns.map(column => {
            if (column.name === data.status) {
              return {
                ...column,
                tasks: [...column.tasks, data]
                
              }
            } else {
              return column;
            }
            
          })
        }
        // console.log('new board data: ', newBoard);

        return newBoard;


        
      })
    ).subscribe(
      value => {
        if (value === null || value === undefined) return;

        const update:Update<IBoard> = {
          id: value.id,
          changes: {
            ...value
          }
        };

        this.store.dispatch(updateBoard({ update }))
      }
    ); 
    
    console.log('would be dispatching soon...');
  }
  


}
