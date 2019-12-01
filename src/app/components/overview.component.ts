import { Component } from '@angular/core';
import { AtmService, Denomination } from '../services/atm.service';

@Component({
    selector: 'ra-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

    public denominations: Denomination[];

    constructor(private readonly atmService: AtmService) { }

    public ngOnInit() {
        this.denominations = this.atmService.getDenominations();
    }
}
