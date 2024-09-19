import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {v4 as uuid} from 'uuid';
import { IBoard, ITask } from '../../model/board.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private boardFormModalActive:boolean = false;
  private taskFormModalActive: boolean = false;
  private taskModalActive: boolean = false;
  private deleteModalActive: boolean = false;

  // subjects
  private boardIsActive:boolean = false;
  private boardFormSubject$ = new BehaviorSubject<boolean>(false);
  boardFormModalActive$ = this.boardFormSubject$.asObservable();

  private taskIsActive:boolean = false;
  private taskFormSubject$ = new BehaviorSubject<boolean>(this.taskIsActive);
  taskFormModalActive$ = this.taskFormSubject$.asObservable();

  private isTaskSelected:boolean = false;
  private selectedTaskSubject$ = new BehaviorSubject<boolean>(this.taskIsActive);
  selectedTaskActive$ = this.selectedTaskSubject$.asObservable();

  // boardSubject
  private selectedBoardSubject = new BehaviorSubject<IBoard | null>(null)
  selectedBoard$ = this.selectedBoardSubject.asObservable()

  taskDetail!:ITask;
  private taskDetailSubject = new BehaviorSubject<ITask | null>(null);
  taskDetail$ = this.taskDetailSubject.asObservable();


  constructor() { }

  activeBoard (board:IBoard) {
    this.selectedBoardSubject.next(board);
  }

  generateId () {
    return uuid();
  }

  toggleBoardModal () {
    this.boardIsActive = !this.boardIsActive;
    this.boardFormSubject$.next(!this.boardFormModalActive)
  }
  toggleTaskModal () {
    this.taskIsActive = !this.taskIsActive;
    this.taskFormSubject$.next(this.taskIsActive)
  }
  toggleSelectedTask () {
    this.isTaskSelected = !this.isTaskSelected;
    this.selectedTaskSubject$.next(this.isTaskSelected)
  }
}
