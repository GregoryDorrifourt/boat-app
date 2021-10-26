import {Inject, Injectable} from '@angular/core';
import {BoatFormData} from "./boat-form-data.interface";
import {STEP} from "../form.constants";
import {Observable, Subject} from "rxjs";
import {AbstractControl} from "@angular/forms";
import {DOCUMENT} from "@angular/common";
import {Boat} from "../../services/boat.interface";
import {ApiService} from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private STORAGE_KEY: string = "boatApp_form";
  public currentStep: STEP = STEP.OWNER
  private boatFormData: BoatFormData = {
    step: STEP.OWNER,
    data: {}
  }

  public formSub: Subject<BoatFormData> = new Subject();

  constructor(@Inject(DOCUMENT) private document: Document, private apiService: ApiService) { }

  public init() {
    const savedFormData = localStorage.getItem(this.STORAGE_KEY);
    if (savedFormData) {
      this.boatFormData = JSON.parse(savedFormData);
    }
  }

  public setData(data: { [key: string]: AbstractControl; }) {
    this.boatFormData = {
      data:{...this.boatFormData.data, ...data},
      step: this.getNextStep()
    }
    this.updateFormSub();
  }

  public getFormData(): BoatFormData {
    return this.boatFormData;
  }

  public setCurrentStep(step: STEP) {
    this.currentStep = step;
  }

  public clean() {
    this.boatFormData = {
      step: STEP.OWNER, data: {}
    }
    localStorage.removeItem(this.STORAGE_KEY)
  }

  private updateFormSub(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.boatFormData))
    this.formSub.next(this.boatFormData);
  }

  private getNextStep(): STEP {
    switch(this.boatFormData.step) {
      case STEP.OWNER:
        return STEP.TYPE;
      case STEP.TYPE:
        return STEP.DESCRIPTION;
      case STEP.DESCRIPTION:
        return STEP.SUCCESS;
      default:
        return STEP.OWNER;
    }
  }

  public submit(): Observable<boolean> {
    const boat: Boat = {...(this.boatFormData.data as Boat)};
    /* Create id - only for mock - avoid Math.random for security issues */
    const crypto = (this.document.defaultView as any).crypto || (this.document.defaultView as any).msCrypto;
    boat.id = Math.abs(crypto.getRandomValues(new Int32Array(100))[0]);
    /**/
    return this.apiService.createBoat(boat);
  }
}
