import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from "./form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormRoutingModule } from "./form-routing.module";
import { OwnerStepComponent } from './steps/owner-step/owner-step.component';
import { TypeStepComponent } from './steps/type-step/type-step.component';
import { DescriptionStepComponent } from './steps/description-step/description-step.component';
import { SuccessComponent } from './steps/success/success.component';

@NgModule({
  declarations: [
    FormComponent,
    OwnerStepComponent,
    TypeStepComponent,
    DescriptionStepComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule
  ]
})
export class FormModule { }
