import { Injectable } from '@angular/core';
import {Boat} from './boat.interface';
import {BoatTypeLabel, OwnerTypeLabel} from '../app.constants';
import {Subject} from 'rxjs';

interface SearchBoatItem {
  id: number;
  search: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _baseBoats: Boat[] = [];
  private searchStrings: SearchBoatItem[] = []
  public filteredBoats: Subject<Boat[]> = new Subject();

  constructor() { }

  public init(boats: Boat[]) {
    this._baseBoats = [...boats];
    this._baseBoats.forEach((boat) => {
      const {id} = boat;
      const search: string = [
        boat.title,
        BoatTypeLabel[boat.type],
        OwnerTypeLabel[boat.ownerType],
        boat.foil ? 'Foil':'',
        boat.crew ? 'equipage':'',
        boat.annex ? 'annexe':'',
        boat['length'] ? `${boat['length']}m`:'',
        boat['width'] ? `${boat['width']}m`:'',
        boat['draught'] ? `Tirant d'eau ${boat['draught']}m`:'',
      ].join('|')
      this.searchStrings.push({id, search: this.cleanString(search)})
    });

    this.filteredBoats.next([...boats]);
  }

  public filter(str: string): void {
    str = this.cleanString(str);
    const terms: string[] = this.getWords(str)
    const filteredBoats: number[] = this.searchStrings.filter(item => {
      return terms.every((term: string) => item.search.indexOf(term) > -1);
    }).map(item => item.id);
    console.log(filteredBoats)
    this.filteredBoats.next([...this._baseBoats].filter(boat => filteredBoats.indexOf(boat.id) > -1));
  }

  public reset() {
    this.filteredBoats.next([...this._baseBoats])
  }

  private getWords(str: string): string[] {
    return str.split(' ').filter(w => !!w);
  }

  private cleanString(str: string): string {
    str = str.toLocaleLowerCase();
    const specialCaracters: {[key:string]: string}[] = [{'à':'a'}, {'ä':'a'}, {'é':'e'}, {'è':'e'}, {'ê':'e'}, {'ë':'e'}, {'ï':'i'}, {'î':'i'}, {'ô':'o'},]
    specialCaracters.forEach((sc: {[key:string]: string})=> {
      str = str.split(Object.keys(sc)[0]).join(Object.values(sc)[0]);
    })
    return str;
  }
}
