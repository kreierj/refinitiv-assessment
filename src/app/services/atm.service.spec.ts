import { AtmService } from "./atm.service";
import { range } from "rxjs";
import { toArray, concatMap } from "rxjs/operators";

describe('AtmService', () => {

  it('it should initially have 10 of each denomination', () => {
      var underTest = new AtmService();

      var denominations = underTest.getDenominations();

      expect(denominations.find(d => d.name === "Ones").count).toBe(10);
      expect(denominations.find(d => d.name === "Fives").count).toBe(10);
      expect(denominations.find(d => d.name === "Tens").count).toBe(10);
      expect(denominations.find(d => d.name === "Twenties").count).toBe(10);
      expect(denominations.find(d => d.name === "Fifties").count).toBe(10);
      expect(denominations.find(d => d.name === "Hundreds").count).toBe(10);
  });

  it('it should withdraw bills correctly', (done) => {
      var underTest = new AtmService();

      underTest.withdraw(26).subscribe(() => {

          var denominations = underTest.getDenominations();

          expect(denominations.find(d => d.name === "Ones").count).toBe(9);
          expect(denominations.find(d => d.name === "Fives").count).toBe(9);
          expect(denominations.find(d => d.name === "Tens").count).toBe(10);
          expect(denominations.find(d => d.name === "Twenties").count).toBe(9);
          expect(denominations.find(d => d.name === "Fifties").count).toBe(10);
          expect(denominations.find(d => d.name === "Hundreds").count).toBe(10);

          done();
      });
  });

  it('it should not overdraw', (done) => {
      var underTest = new AtmService();

      range(0, 11)
          .pipe(
              concatMap(c => underTest.withdraw(1)),
              toArray()
          )
          .subscribe((result) => {
              var denominations = underTest.getDenominations();

              expect(denominations.find(d => d.name === "Ones").count).toBe(0);
              expect(denominations.find(d => d.name === "Fives").count).toBe(10);
              expect(denominations.find(d => d.name === "Tens").count).toBe(10);
              expect(denominations.find(d => d.name === "Twenties").count).toBe(10);
              expect(denominations.find(d => d.name === "Fifties").count).toBe(10);
              expect(denominations.find(d => d.name === "Hundreds").count).toBe(10);

              var last = result.pop();
              expect(last.success).toBe(false);
              result.forEach(r => expect(r.success).toBe(true));

              done();
          });
  });
});
