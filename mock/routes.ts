import { Routes } from '@angular/router';
import {
  ExampleAddComponent,
  ExampleComponent,
  ExampleEditComponent,
  ExampleIndexComponent,
  ExampleOptComponent
} from '@mock/example.component';

export const routes: Routes = [
  {
    path: '',
    component: ExampleComponent
  },
  {
    path: 'example-index',
    component: ExampleIndexComponent
  },
  {
    path: 'example-add',
    component: ExampleAddComponent
  },
  {
    path: 'example-edit/:key',
    component: ExampleEditComponent
  },
  {
    path: 'example-opt/:key/:subkey',
    component: ExampleOptComponent
  }
];
