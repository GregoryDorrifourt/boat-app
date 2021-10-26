import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StepClass} from "../step.class";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {imgUrlRegEx, STEP} from "../../form.constants";
import {of, timer} from "rxjs";
import {BoatFormData} from "../../services/boat-form-data.interface";
import {BOAT_TYPE} from "../../../app.constants";
import {FormService} from "../../services/form.service";

type FormField = {
  key: string;
  classNames?: string;
  label: string;
  type: string;
  defaultValue: number | boolean | string | null;
  validators: (((control: AbstractControl) => (ValidationErrors | null)) | ValidatorFn)[];
}

enum FIELD_KEY {
  TITLE= 'title',
  IMAGE= 'image',
  LENGTH= 'length',
  WIDTH= 'width',
  DRAUGHT= 'draught',
  FOIL= 'foil',
  CREW= 'crew',
  ANNEX= 'annex',
}

@Component({
  selector: 'app-description-step',
  templateUrl: './description-step.component.html',
  styleUrls: ['./description-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionStepComponent extends StepClass implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group({});

  public INPUT_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    CHECKBOX: 'checkbox'
  }

  private allFields: FormField[] = [
    {
      key: FIELD_KEY.TITLE,
      label: 'Titre',
      type: this.INPUT_TYPE.TEXT,
      defaultValue: '',
      validators: [Validators.required]
    },
    {
      key: FIELD_KEY.IMAGE,
      label: 'Image (.jpg ou .png)',
      type: this.INPUT_TYPE.TEXT,
      defaultValue: '',
      validators: [Validators.required, Validators.pattern(imgUrlRegEx)]
    },
    {
      key: FIELD_KEY.LENGTH,
      label: 'Longueur (en m)',
      type: this.INPUT_TYPE.NUMBER,
      defaultValue: null,
      validators: [Validators.required, Validators.min(0), Validators.max(100)]
    },
    {
      key: FIELD_KEY.WIDTH,
      label: 'Largeur (en m)',
      type: this.INPUT_TYPE.NUMBER,
      defaultValue: null,
      validators: [Validators.required, Validators.min(0), Validators.max(100)]
    },
    {
      key: FIELD_KEY.DRAUGHT,
      label: 'Tirant d\'eau (en m)',
      type: this.INPUT_TYPE.NUMBER,
      defaultValue: null,
      validators: [Validators.required, Validators.min(0), Validators.max(10)]
    },
    {
      key: FIELD_KEY.FOIL,
      label: 'Foil',
      type: this.INPUT_TYPE.CHECKBOX,
      defaultValue: false,
      validators: []
    },
    {
      key: FIELD_KEY.CREW,
      label: 'Équipage',
      type: this.INPUT_TYPE.CHECKBOX,
      defaultValue: false,
      validators: []
    },
    {
      key: FIELD_KEY.ANNEX,
      label: 'Annexe',
      type: this.INPUT_TYPE.CHECKBOX,
      defaultValue: false,
      validators: []
    }
  ]

  private defaultFields = [FIELD_KEY.TITLE, FIELD_KEY.IMAGE];

  private customFieldsForTypes: { [key: number]: FIELD_KEY[] } = {
    [BOAT_TYPE.CATAMARAN]: [FIELD_KEY.LENGTH, FIELD_KEY.WIDTH, FIELD_KEY.DRAUGHT, FIELD_KEY.CREW, FIELD_KEY.ANNEX],
    [BOAT_TYPE.SAILBOAT]: [FIELD_KEY.LENGTH, FIELD_KEY.WIDTH, FIELD_KEY.DRAUGHT, FIELD_KEY.FOIL, FIELD_KEY.CREW, FIELD_KEY.ANNEX],
  };

  public formFields: FormField[] = []

  constructor(protected formService: FormService, protected formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formService, formBuilder);
  }

  ngOnInit(): void {
    this.formService.setCurrentStep(STEP.DESCRIPTION);

    of(this.formService.getFormData()).subscribe((formData: BoatFormData) => {

      const fieldKeys: FIELD_KEY[] = [...this.defaultFields, ...(this.customFieldsForTypes[formData.data.type as BOAT_TYPE] || [])];

      const fields: FormField[] = [];
      fieldKeys.forEach((key: FIELD_KEY) => {
        const field: FormField = this.allFields.filter(f => f.key === key)[0];
        this.formGroup.addControl(field.key, this.formBuilder.control(field.defaultValue, field.validators));
        fields.push(field);
      });
      this.formFields = fields;
      this.cdr.detectChanges();
    })
  }

}
