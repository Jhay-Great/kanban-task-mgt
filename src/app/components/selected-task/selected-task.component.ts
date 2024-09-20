import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application/application.service';
import { filter, map, Observable, tap } from 'rxjs';
import { IColumns, ITask } from '../../model/board.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-selected-task',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './selected-task.component.html',
  styleUrl: './selected-task.component.scss'
})
export class SelectedTaskComponent implements OnInit {
  title:string = 'hello'
  task!:Observable<ITask | null>;
  columns$!:Observable<IColumns[]>;
  statusCount!:Observable<number>;

  constructor (
    private appService: ApplicationService,
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

  removeModal () {
    console.log('called...')
    this.appService.toggleSelectedTask();
  }

}
