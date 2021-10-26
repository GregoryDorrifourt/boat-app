import {FormService} from "../services/form.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Directive} from "@angular/core";

@Directive()
export class StepClass {

  public formGroup: FormGroup | undefined;

  constructor(protected formService: FormService, protected formBuilder: FormBuilder) {
  }

  public nextStep(): void {
    if (this.formGroup) {
      const value = this.formGroup.getRawValue();
      this.formService.setData(value);
    }
  }
}
