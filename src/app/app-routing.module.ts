import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPage } from './pages/overview.page';
import { RestockPage } from './pages/restock.page';
import { WithdrawPage } from './pages/withdraw.page';

const routes: Routes = [
    { path: 'overview', component: OverviewPage },
    { path: 'restock', component: RestockPage },
    { path: 'withdraw', component: WithdrawPage },
    { path: '**', redirectTo: 'withdraw' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
