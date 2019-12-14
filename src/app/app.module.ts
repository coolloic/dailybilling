import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateFormatPipe } from './shared/pipe/date-format.pipe';
import { SortByDatePipe } from './shared/pipe/sort-by-date.pipe';
import {DailyBillingModule} from './daily-billing/daily-billing.module';

@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    SortByDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DailyBillingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
