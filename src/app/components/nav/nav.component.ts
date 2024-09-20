import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application/application.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/AppState';
import { deleteBoard } from '../../state/board/board.action';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  boardName: string = 'Platform Launch';
  isActive: boolean = false;

  constructor(
    private appService: ApplicationService, 
    private store: Store<AppState>,
  ) {}

  addTask(): void {
    this.appService.toggleTaskModal();
  }

  toggleSettingsMenu() {
    this.isActive = !this.isActive;
  }

  editBoard() {
    this.isActive = false;
  }

  deleteBoard() {
    this.isActive = false;
    const subscription = this.appService.selectedBoard$.subscribe(
      board => {
        if (board === null) return;
        const { id } = board;
        console.log('deleting: ', id);
        this.store.dispatch(deleteBoard({id}));
      }
    );

    subscription.unsubscribe();
  }
}
