import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing/landing.component').then((m) => m.LandingComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./components/faq/faq.component').then((m) => m.FaqComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then((m) => m.ContactComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth.component').then((m) => m.AuthComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
