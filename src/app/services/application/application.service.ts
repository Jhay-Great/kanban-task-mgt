import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private boardFormModalActive:boolean = false;
  private taskFormModalActive: boolean = false;
  private taskModalActive: boolean = false;
  private deleteModalActive: boolean = false;

  // subjects
  boardIsActive:boolean = false;
  private boardFormSubject$ = new BehaviorSubject<boolean>(false);
  boardFormModalActive$ = this.boardFormSubject$.asObservable();

  taskIsActive:boolean = false;
  private taskFormSubject$ = new BehaviorSubject<boolean>(this.taskIsActive);
  taskFormModalActive$ = this.taskFormSubject$.asObservable();


  constructor() { }

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
}
