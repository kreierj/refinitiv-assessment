import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewPage } from './pages/overview.page';
import { RestockPage } from './pages/restock.page';
import { WithdrawPage } from './pages/withdraw.page';
import { AtmService } from './services/atm.service';
import { WithdrawComponent } from './components/withdraw.component';


@NgModule({
  declarations: [
      AppComponent,
      OverviewPage,
      RestockPage,
      WithdrawPage,
      WithdrawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [AtmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
