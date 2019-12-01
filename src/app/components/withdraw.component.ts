import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AtmService } from '../services/atm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'ra-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {

    public formGroup: FormGroup;
    public amount: FormControl;

    public resultText: string = '';

    constructor(private readonly atmService: AtmService, private readonly snackBar: MatSnackBar) { }

    public ngOnInit() {
        this.amount = new FormControl(null, [Validators.min(0), Validators.required]);

        this.formGroup = new FormGroup({
            amount: this.amount
        });
    }

    public withdraw() {
        if (this.formGroup.valid) {
            var amount = Number(this.amount.value);
            var result = this.atmService.withdraw(amount);
            if (result.success) {
                this.displaySuccess(amount);
                this.formGroup.reset();
            } else {
                this.displayError();
            }
        }
    }

    private openSnackBar(message: string, style: 'success' | 'error') {
        this.snackBar.open(message, "OK", {
            verticalPosition: 'top',
            panelClass: 'snackbar-' + style,
            duration: 2000
        });
    }

    private displaySuccess(amount: number) {
        this.openSnackBar(`Dispensed $${amount}`, 'success');
    }

    private displayError() {
        this.openSnackBar('Insufficient Funds', 'error');
    }
}
