import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';
import {v4 as uuid} from 'uuid';
import { IBoard, IColumns, ITask } from '../../model/board.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private boardFormModalActive:boolean = false;
  private taskFormModalActive: boolean = false;
  private taskModalActive: boolean = false;
  private deleteModalActive: boolean = false;

  isEditable:boolean = false;

  // subjects
  private boardIsActive:boolean = false;
  private boardFormSubject$ = new BehaviorSubject<boolean>(this.boardIsActive);
  boardFormModalActive$ = this.boardFormSubject$.asObservable();

  private taskIsActive:boolean = false;
  private taskFormSubject$ = new BehaviorSubject<boolean>(this.taskIsActive);
  taskFormModalActive$ = this.taskFormSubject$.asObservable();

  private isTaskSelected:boolean = false;
  private selectedTaskSubject$ = new BehaviorSubject<boolean>(this.taskIsActive);
  selectedTaskActive$ = this.selectedTaskSubject$.asObservable();

  // boardSubject
  selectedBoard:IBoard | null = null;
  private selectedBoardSubject = new BehaviorSubject<IBoard | null>(this.selectedBoard)
  selectedBoard$ = this.selectedBoardSubject.asObservable()

  private boardFormSubject = new BehaviorSubject<IBoard | null>(null);
  boardFormData$ = this.boardFormSubject.asObservable();

  private taskDetail!:ITask;
  private taskDetailSubject = new BehaviorSubject<ITask | null>(null);
  taskDetail$ = this.taskDetailSubject.asObservable();


  constructor() { }

  // returns an observable of a preferred type and not a union type including undefined
  getColumns ():Observable<IColumns[]> {
    return this.selectedBoard$.pipe(
      filter(data => data != null),
      map(data => {
        return data!.columns;
      }),
    )
  }

  activeBoard (board:IBoard) {
    this.selectedBoard = board;
    this.selectedBoardSubject.next(this.selectedBoard);
  }

  generateId () {
    return uuid();
  }

  toggleBoardModal () {
    console.log('toggle board modal call triggered in service')
    this.boardIsActive = !this.boardIsActive;
    this.boardFormSubject$.next(this.boardIsActive)
  }
  toggleTaskModal () {
    this.taskIsActive = !this.taskIsActive;
    this.taskFormSubject$.next(this.taskIsActive)
  }
  toggleSelectedTask () {
    this.isTaskSelected = !this.isTaskSelected;
    this.selectedTaskSubject$.next(this.isTaskSelected)
  }
  
  displayTaskDetail (data:ITask) {
    this.taskDetailSubject.next(data)
  }

  populateBoardForm () {
    // console.log(this.selectedBoard);
    this.isEditable = true;
    this.toggleBoardModal();
    this.boardFormSubject.next(this.selectedBoard);
    
  }
}
