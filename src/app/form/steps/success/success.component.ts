import { Component, OnInit } from '@angular/core';
import {FormService} from "../../services/form.service";
import {BoatFormData} from "../../services/boat-form-data.interface";
import {of} from "rxjs";
import {Boat} from "../../../services/boat.interface";
import {BoatTypeLabel, OwnerTypeLabel} from "../../../app.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  public boat: Boat|null = null;

  private _boatType: string = '';
  public get boatType(): string {
    if(this.boat && !this._boatType) {
      this._boatType = BoatTypeLabel[this.boat.type];
    }
    return this._boatType
  }

  private _ownerType: string = '';
  public get ownerType(): string {
    if(this.boat && !this._ownerType) {
      this._ownerType = OwnerTypeLabel[this.boat.ownerType];
    }
    return this._ownerType
  }

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    of(this.formService.getFormData()).subscribe((formData: BoatFormData) => {
      this.boat = formData.data as Boat;
    })
  }

  public submit(): void {
    this.formService.submit().subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }

}
