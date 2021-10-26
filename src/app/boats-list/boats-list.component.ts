import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Subscription} from "rxjs";
import {Boat} from "../services/boat.interface";
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-boats-list',
  templateUrl: './boats-list.component.html',
  styleUrls: ['./boats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoatsListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public initialized: boolean = false;

  public boats: Boat[] = [];

  constructor(
    private apiService: ApiService,
    private filterService: FilterService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.apiService.getBoats().subscribe((boats: Boat[]) => {
      const filterSub: Subscription = this.filterService.filteredBoats.asObservable().subscribe((filteredBoats: Boat[]) => {
        this.boats = filteredBoats;
        this.cdr.detectChanges();
      });
      this.subscriptions.push(filterSub);
      this.filterService.init(boats);
      this.initialized = true;
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
