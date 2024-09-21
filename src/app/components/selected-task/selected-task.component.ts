import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application/application.service';
import { combineLatest, filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { IBoard, IColumns, ITask } from '../../model/board.interface';
import { AsyncPipe } from '@angular/common';
import { SettingsDropdownMenuComponent } from "../settings-dropdown-menu/settings-dropdown-menu.component";
import { AppState } from '../../model/AppState';
import { Store } from '@ngrx/store';
import { updateBoard } from '../../state/board/board.action';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-selected-task',
  standalone: true,
  imports: [AsyncPipe, SettingsDropdownMenuComponent],
  templateUrl: './selected-task.component.html',
  styleUrl: './selected-task.component.scss'
})
export class SelectedTaskComponent implements OnInit {
  title:string = 'hello'
  task!:Observable<ITask | null>;
  columns$!:Observable<IColumns[]>;
  statusCount!:Observable<number>;
  isActive:boolean = false;

  constructor (
    private appService: ApplicationService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    const data = this.appService.taskDetail$;
    if (!data) return;
    this.task = data;

    this.columns$ = this.appService.getColumns();

    // checking completed task
    // this.statusCount = this.task.pipe(
    //   filter(data => data !== null),
    //   map(task =>
    //     task?.subtasks.map(subtask => {
    //       let count = 0;
    //       subtask.isComplete && count++;
    //       return count
    //     }
    //     )
    //   ),
    //   tap(data => console.log(data))
    // )
    
    // this.statusCount = this.task.pipe(
    //   filter(data => data !== null),
    //   map(task => 
    //     task?.subtasks.reduce((count, subtask) => {
    //       return subtask.isComplete ? count + 1 : count;
    //     }, 0) // Start counting from 0
    //   ),
    //   tap(data => console.log(data)) // Log the total count
    // )

    // understand what this is actually doing
    this.statusCount = this.task.pipe(
      filter(data => data !== null),  // Ensure that the task is not null
      map(task => {
        // Ensure subtasks exist, otherwise return 0
        return task?.subtasks
          ? task.subtasks.reduce((count, subtask) => {
              return subtask.isComplete ? count + 1 : count;
            }, 0)  // Start counting from 0
          : 0;  // Return 0 if task or subtasks are undefined
      }),
      tap(data => console.log(data))  // Log the total count
    )
    
    


  }

  toggleSettingsMenu() {
    this.isActive = !this.isActive;
  }

  // delete task
  delete () {
    
    const selectedBoard$ = this.appService.selectedBoard$;
    const selectTask$ = this.task;

    combineLatest([selectedBoard$, selectTask$]).pipe(
      take(1),
      map(([board, task]) => {
        if (board === null || task === null) return;

        const updatedTask = {
          ...board,
          columns: board.columns.map(columnTask => 
          ({
            ...columnTask,
            tasks: columnTask.tasks.filter(taskDetail =>
              taskDetail.title !== task.title
            )
          })
          )
        }

        // return updatedTask;
        
        
        // const updatedTask = board?.columns.map(
        //   columnTask => columnTask.tasks = columnTask.tasks.filter(taskDetail =>
        //     taskDetail.title !== task?.title
        //   )
        // )
        // const updatedObj = {
        //   name: board?.name,
        //   columns: board?.columns.map((column, index) =>
        //   ({
        //     name: column.name,
        //     tasks: updatedTask ||column.tasks
        //   })
        //   )
        // }
        // console.log('logging updated object: ', updatedObj);
        // return updatedTask;
        return {id: board.id, changes: updatedTask};
      }),
    ).subscribe(
      data => {
        if (data === null) return;
        const update = data as Update<IBoard>;
        console.log('data to be dispatched: ', update);
        this.store.dispatch(updateBoard({update}))
      }
    );


  }

  removeModal () {
    console.log('called...')
    this.appService.toggleSelectedTask();
  }

}
