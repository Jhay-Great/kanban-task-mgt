import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { boardReducer } from './state/board/board.reducer';
import { BoardEffect } from './state/board/board.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideRouterStore(),
    provideEffects(BoardEffect),
    provideStore(),
    provideState(
      {
        name: 'boards', reducer: boardReducer,
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
