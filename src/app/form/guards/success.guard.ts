import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {FormService} from "../services/form.service";
import {STEP} from "../form.constants";

@Injectable({
  providedIn: 'root'
})
export class SuccessGuard implements CanActivate {

  constructor(private router: Router, private formService: FormService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.formService.getFormData().step === STEP.SUCCESS ? true : this.router.parseUrl('/create');
  }

}
