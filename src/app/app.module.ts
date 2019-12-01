import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewPage } from './pages/overview.page';
import { RestockPage } from './pages/restock.page';
import { WithdrawPage } from './pages/withdraw.page';

@NgModule({
  declarations: [
      AppComponent,
      OverviewPage,
      RestockPage,
      WithdrawPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
