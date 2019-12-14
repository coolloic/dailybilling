import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyBillingComponent } from './daily-billing/daily-billing.component';
import { DateFormatPipe } from './shared/pipe/date-format.pipe';
import { SortByDatePipe } from './shared/pipe/sort-by-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DailyBillingComponent,
    DateFormatPipe,
    SortByDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
