import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardContainerComponent } from './components/board-container/board-container.component';
// import { BoardContainerComponent } from './components/board-container/board-container.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: AppComponent,
    // },
    {
        path: 'board/:id',
        component: BoardContainerComponent,
    }
    
];
