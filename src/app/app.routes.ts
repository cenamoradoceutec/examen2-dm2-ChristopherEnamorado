import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'character-firestore-page',
    loadComponent: () =>
      import('./pages/character-firestore/character-firestore.page').then(
        (m) => m.CharacterFirestorePage
      ),
  },
  {
    path: 'character-crud',
    loadComponent: () =>
      import('./pages/character-crud/character-crud.page').then(
        (m) => m.CharacterCrudPage
      ),
  },
  {
    path: 'comme-page',
    loadComponent: () =>
      import('./pages/comme-page/comme-page.page').then(m => m.CommePage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'character-crud' },
];
