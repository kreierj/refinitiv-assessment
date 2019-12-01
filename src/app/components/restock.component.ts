import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AtmService, Denomination } from '../services/atm.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResultService } from '../services/result.service';

@Component({
    selector: 'ra-restock',
    templateUrl: './restock.component.html',
    styleUrls: ['./restock.component.scss']
})
export class RestockComponent {
    public formGroup: FormGroup;
    public denominations: Denomination[];

    constructor(private readonly atmService: AtmService, private readonly resultService: ResultService) { }

    public ngOnInit() {
        this.formGroup = new FormGroup({});

        this.denominations = this.atmService.getDenominations();

        for (let d of this.denominations) {
            this.formGroup.addControl(`${d.name}`, new FormControl(null, [Validators.min(0)]));
        }
    }

    public restock() {
        if (this.formGroup.valid) {

            var formValue = this.formGroup.value;
            var toRestock = Object.keys(formValue)
                .map(key => { return { key: key, count: Number(formValue[key]) }; })
                .filter(kvp => kvp.count && kvp.count > 0)
                .map(kvp => {
                    var match = this.denominations.find(d => d.name === kvp.key)
                    var result: Denomination = { value: match.value, count: kvp.count };
                    return result;
                })

            this.atmService.restock(toRestock)
              .pipe(catchError(() => of(false)))
                .subscribe((result) => {
                    if (result) {
                        this.formGroup.reset();
                        this.resultService.displaySuccess("ATM Restocked Successfully")
                    } else {
                        this.resultService.displayError("Unexpected Error Encountered")
                    }
              });
        }
    }
}
