import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from './services/board.service';
import { AppState } from './model/AppState';
import { Store } from '@ngrx/store';
import { selectBoard } from './state/board/board.selector';
import { createBoard, onLoadBoardData } from './state/board/board.action';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardContainerComponent } from './components/board-container/board-container.component';
import { TaskFormModalComponent } from './modals/task-form-modal/task-form-modal.component';
import { BoardFormModalComponent } from './modals/board-form-modal/board-form-modal.component';
import { ApplicationService } from './services/application/application.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SelectedTaskComponent } from './components/selected-task/selected-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NavComponent,
    SidebarComponent,
    BoardContainerComponent,
    TaskFormModalComponent,
    BoardFormModalComponent,
    SelectedTaskComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'kanban';
  boardModalIsActive!:Observable<boolean>;
  taskModalIsActive!:Observable<boolean>;
  taskDetailsIsActive!:Observable<boolean>;
  

  constructor(private store: Store<AppState>, private appService: ApplicationService) {}

  ngOnInit(): void {
    this.store.dispatch(onLoadBoardData()),
      this.store
        .select(selectBoard)
        .subscribe((value) => console.log('boards: ', value));
    
    this.boardModalIsActive = this.appService.boardFormModalActive$
    this.taskModalIsActive = this.appService.taskFormModalActive$
    this.taskDetailsIsActive = this.appService.selectedTaskActive$
  }

  removeModal () {
    console.log('called...')
    this.appService.toggleTaskModal();
  }
}
