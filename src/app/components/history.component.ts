import { Component } from '@angular/core';
import { WithdrawlResult, AtmService } from '../services/atm.service';

@Component({
    selector: 'ra-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
    public history: WithdrawlResult[] = [];

    constructor(private readonly atmService: AtmService) { }

    public ngOnInit() {
        this.history = this.atmService.getTransactions();
    }
}
