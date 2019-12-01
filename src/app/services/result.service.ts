import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ResultService {

    constructor(private readonly snackBar: MatSnackBar) { }

    private openSnackBar(message: string, style: 'success' | 'error') {
        this.snackBar.open(message, "OK", {
            verticalPosition: 'top',
            panelClass: 'snackbar-' + style,
            duration: 1500
        });
    }

    public displaySuccess(message: string) {
        this.openSnackBar(message, 'success');
    }

    public displayError(message: string) {
        this.openSnackBar(message, 'error');
    }
}
