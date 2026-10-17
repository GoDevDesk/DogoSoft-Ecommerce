import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'DogoSoft FastFood | Sistema para tu local, desde $ 9.900/mes' },
  { path: '**', redirectTo: '' }
];
