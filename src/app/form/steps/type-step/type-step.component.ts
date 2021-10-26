import { Component, OnInit } from '@angular/core';
import { StepClass } from '../step.class';
import {STEP} from "../../form.constants";
import {BOAT_TYPE, BoatTypeLabel} from "../../../app.constants";
import {FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-type-step',
  templateUrl: './type-step.component.html',
  styleUrls: ['./type-step.component.scss']
})
export class TypeStepComponent extends StepClass implements OnInit {

  public boatTypes: {value: string|BOAT_TYPE, label: string}[] = []
  public formGroup: FormGroup = this.formBuilder.group({
    type: [null, Validators.required]
  });

  ngOnInit(): void {
    this.formService.setCurrentStep(STEP.TYPE);
    this.boatTypes = Object.values(BOAT_TYPE).filter(i => !isNaN(Number(i))).map((ot) => {
      return {value: ot, label: BoatTypeLabel[ot as unknown as BOAT_TYPE]}
    });
  }

}
