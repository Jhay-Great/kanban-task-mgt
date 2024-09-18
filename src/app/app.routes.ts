import { Routes } from '@angular/router';
import { BoardContainerComponent } from './components/board-container/board-container.component';
// import { AppComponent } from './app.component';


export const routes: Routes = [
    // {
    //     path: '',
    //     component: AppComponent,
    // },
    {
        path: 'board/:id',
        component: BoardContainerComponent,
    },
    {
        path: 'create-board',
        loadComponent: () => import('./modals/board-form-modal/board-form-modal.component').then((c) => c.BoardFormModalComponent),
    },
    {
        path: 'create-task',
        loadComponent: () => import('./modals/task-form-modal/task-form-modal.component').then((c) => c.TaskFormModalComponent),
    }
    
];
