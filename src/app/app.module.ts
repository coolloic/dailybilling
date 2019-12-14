import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DailyBillingModule} from './daily-billing/daily-billing.module';

@NgModule({
  declarations: [
    AppComponent,
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
