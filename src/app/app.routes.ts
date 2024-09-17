import { Routes } from '@angular/router';
// import { BoardContainerComponent } from './components/board-container/board-container.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/board-container/board-container.component').then((c) => c.BoardContainerComponent),
    }
];
