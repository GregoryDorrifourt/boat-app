import { Component, OnInit } from '@angular/core';
import {FormService} from "./services/form.service";
import {BoatFormData} from "./services/boat-form-data.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.formService.formSub.asObservable().subscribe((data: BoatFormData) => {

      if (this.formService.currentStep !== data.step) {
        this.router.navigateByUrl(data.step);
      }
    })
    this.formService.init();
  }

}
