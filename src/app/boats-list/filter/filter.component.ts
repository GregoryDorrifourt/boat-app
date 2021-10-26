import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterService} from "../../services/filter.service";
import {Subject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  private filterSubject: Subject<string> = new Subject();
  private subscriptions: Subscription[] = []

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filterSubject
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          tap((e) => this.filterService.filter(e))
        ).subscribe()
    );
  }

  public handleKeyUp(value: string) {
    this.filterSubject.next(value);
  }

  public removeFilter() {
    this.filterService.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
