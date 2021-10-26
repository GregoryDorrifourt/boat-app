import {Component, Input, OnInit} from '@angular/core';
import {Boat} from "../../services/boat.interface";
import {BoatTypeLabel, OWNER_TYPE} from "../../app.constants";

@Component({
  selector: 'app-boat-list-item',
  templateUrl: './boat-list-item.component.html',
  styleUrls: ['./boat-list-item.component.scss']
})
export class BoatListItemComponent implements OnInit {

  @Input('boat-data') public boat: Boat|null = null;

  private _boatType: string = '';
  public get boatType(): string {
    if(this.boat && !this._boatType) {
      this._boatType = BoatTypeLabel[this.boat.type];
    }
    return this._boatType
  }

  public get isPro(): boolean {
    return this.boat?.ownerType === OWNER_TYPE.PROFESSIONAL;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
