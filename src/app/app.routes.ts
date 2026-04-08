import { Routes } from '@angular/router';
import { Characterlist } from './characterlist/characterlist';
import { Characterdetails } from './characterdetails/characterdetails';

export const routes: Routes = [
  { path: '', component: Characterlist },
  { path: 'character/:id', component: Characterdetails }
];