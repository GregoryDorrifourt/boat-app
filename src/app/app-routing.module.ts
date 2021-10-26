import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatsListComponent } from './boats-list/boats-list.component';

const routes: Routes = [
  {
    path: '',
    component: BoatsListComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
