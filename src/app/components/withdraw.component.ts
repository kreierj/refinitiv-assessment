import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AtmService, WithdrawlResult } from '../services/atm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResultService } from '../services/result.service';

@Component({
    selector: 'ra-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {

    public formGroup: FormGroup;
    public amount: FormControl;

    constructor(private readonly atmService: AtmService, private readonly resultService: ResultService) { }

    public ngOnInit() {
        this.amount = new FormControl(null, [Validators.min(0), Validators.required]);

        this.formGroup = new FormGroup({
            amount: this.amount
        });
    }

    public withdraw() {
        if (this.formGroup.valid) {
            var amount = Number(this.amount.value);
            this.atmService.withdraw(amount)
                .pipe(catchError(() => of({ success: false } as WithdrawlResult)))
                .subscribe(result => {
                  if (result.success) {
                      this.displaySuccess(amount);
                      this.formGroup.reset();
                  } else {
                      this.displayError();
                  }
              });
        }
    }

    private displaySuccess(amount: number) {
        this.resultService.displaySuccess(`Dispensed $${amount}`);
    }

    private displayError() {
        this.resultService.displayError('Insufficient Funds');
    }
}
