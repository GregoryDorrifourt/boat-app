import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatsListComponent } from './boats-list/boats-list.component';
import { BoatListItemComponent } from './boats-list/boat-list-item/boat-list-item.component';
import { ApiService } from "./services/api.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FilterComponent } from './boats-list/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    BoatsListComponent,
    BoatListItemComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
