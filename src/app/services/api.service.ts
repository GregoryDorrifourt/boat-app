import {Inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Boat } from "./boat.interface";
import {catchError, tap} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private STORAGE_KEY: string = 'boatApp-APIData';

  private apiEndpoint: string = './assets/mocks/';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  private get(url: string): Observable<Object> {
    const rawStorageData: string | null = localStorage.getItem(this.STORAGE_KEY);
    if(rawStorageData) {
      return of(JSON.parse(rawStorageData))
    } else {
      const requestUrl: string = `${this.apiEndpoint}${url}.json`;
      return this.http.get(requestUrl)
        .pipe(
          catchError(err => []),
          tap(data => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
          })
        )
    }
  }

  public getBoats(): Observable<Boat[]> {
    return (this.get('list') as Observable<Boat[]>);
  }

  public createBoat(boat: Boat): Observable<boolean> {
    const rawStorageData: string = localStorage.getItem(this.STORAGE_KEY) || '[]';
    const data = [boat, ...JSON.parse(rawStorageData)];
    return of(true).pipe(
      tap(() => (localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))))
    )
  }
}
