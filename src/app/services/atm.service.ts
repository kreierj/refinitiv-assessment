import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AtmService {

    // List of denominations supported by the ATM
    private denominations: { [key: number]: Denomination } = {
        100: { name: "Hundreds", value: 100, count: 10 },
        50: { name: "Fifties", value: 50, count: 10 },
        20: { name: "Twenties", value: 20, count: 10 },
        10: { name: "Tens", value: 10, count: 10 },
        5: { name: "Fives", value: 5, count: 10 },
        1: { name: "Ones", value: 1, count: 10 }
    };

    // Calculated at runtime to allow for easy addition or removal of supported denominations
    private denominationOrder: number[];

    private transactionHistory: WithdrawlResult[] = [];

    constructor() {
        this.denominationOrder = Object.keys(this.denominations)
            .map(k => this.denominations[k])
            .map((v: Denomination) => v.value)
            .sort(this.orderByDesc)
    }

    public getDenominations(): Denomination[] {
        return Object.keys(this.denominations).map(k => this.denominations[k]).map((d: Denomination) => Object.assign({}, d));
    }

    public withdraw(amount: number): Observable<WithdrawlResult> {
        if (!Number.isInteger(amount)) {
            return this.transactionFailure();
        }

        if (amount < 0) {
            return this.transactionFailure();
        }

        var denominationsToDispense: Denomination[] = [];
        var amountDispensed: number = 0;

        for (let v of this.denominationOrder) {
            var denomination = this.denominations[v];
            if (!denomination) {
                continue;
            }

            var toDispense: Denomination = { value: denomination.value, count: 0 };
            while (amount >= amountDispensed + denomination.value) {
                if (toDispense.count < denomination.count) {
                    toDispense.count++;
                    amountDispensed += toDispense.value;
                } else {
                    break;
                }
            }

            denominationsToDispense.push(toDispense);
        }

        if (amount === amountDispensed) {
            for (let d of denominationsToDispense) {
                var denomination = this.denominations[d.value];
                denomination.count -= d.count;
                console.assert(denomination.count >= 0, "Unexpected denomination count: " + denomination)
            }

            return this.transactionSuccess();
        } else {
            return this.transactionFailure();
        }
    }

    public restock(denominations: Denomination[]): Observable<boolean> {
        for (let d of denominations) {
            var denomination = this.denominations[d.value];
            if (denomination) {
                denomination.count += d.count;
            }
        }

        return of(true);
    }

    private transactionFailure(): Observable<WithdrawlResult> {
        var result = { success: false }
        this.transactionHistory.push(result);
        return of(result);
    }

    private transactionSuccess(): Observable<WithdrawlResult> {
        var result = { success: true }
        this.transactionHistory.push(result);
        return of(result);
    }

    private orderByDesc(a: number, b: number) {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    }
}

export interface Denomination {
    name?: string;
    value: number;
    count: number;
}

export interface WithdrawlResult {
    success: boolean;
}
