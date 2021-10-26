import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from './form.component';
import {OwnerStepComponent} from './steps/owner-step/owner-step.component';
import {TypeStepComponent} from './steps/type-step/type-step.component';
import {SuccessComponent} from './steps/success/success.component';
import {TypeStepGuard} from './guards/type-step.guard';
import {SuccessGuard} from './guards/success.guard';
import {DescriptionStepComponent} from './steps/description-step/description-step.component';
import {DescriptionStepGuard} from "./guards/description-step.guard";

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [
      {
        path: '',
        component: OwnerStepComponent
      },
      {
        path: 'type',
        component: TypeStepComponent,
        canActivate: [TypeStepGuard]
      },
      {
        path: 'description',
        component: DescriptionStepComponent,
        canActivate: [DescriptionStepGuard]
      }
    ]
  },
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [SuccessGuard]
  },
  {
    path: '**',
    redirectTo: '/create'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
