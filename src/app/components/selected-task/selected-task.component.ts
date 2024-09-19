import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application/application.service';
import { Observable } from 'rxjs';
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

  constructor (
    private appService: ApplicationService,
  ) {}

  ngOnInit(): void {
    const data = this.appService.taskDetail$;
    if (!data) return;
    this.task = data;

    this.columns$ = this.appService.getColumns();


  }

}
