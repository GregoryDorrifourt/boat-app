import { Component, OnInit } from '@angular/core';
import {OWNER_TYPE, OwnerTypeLabel} from "../../../app.constants";
import {FormGroup, Validators} from "@angular/forms";
import {STEP} from "../../form.constants";
import {StepClass} from "../step.class";

@Component({
  selector: 'app-owner-step',
  templateUrl: './owner-step.component.html',
  styleUrls: ['./owner-step.component.scss']
})
export class OwnerStepComponent extends StepClass implements OnInit {

  public ownerTypes: {value: string|OWNER_TYPE, label: string}[] = []
  public formGroup: FormGroup = this.formBuilder.group({
    ownerType: [null, Validators.required]
  });

  ngOnInit(): void {
    this.formService.setCurrentStep(STEP.OWNER);
    this.formService.clean();
    this.ownerTypes = Object.values(OWNER_TYPE).filter(i => !isNaN(Number(i))).map((ot) => {
      return {value: ot, label: OwnerTypeLabel[ot as unknown as OWNER_TYPE]}
    });
  }

}
