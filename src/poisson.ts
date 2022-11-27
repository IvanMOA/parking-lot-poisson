import {NumberRange} from "./NumberRange";
let k_total = 20; // number of times the event is repeated
let landa = 10;  // Promedian number of error expected in a given time (Landa symbol)
let exponential = 2.718281828;
let total = 0;
let numerator, denominator;
function poisson(k: number, landa: number): number {
    let exponentialPower = Math.pow(exponential, -landa); // negative power k
    let landaPowerK = Math.pow(landa, k); // Landa elevated k
    numerator = exponentialPower * landaPowerK;
    denominator = factorial(k); // factorial of k.
    return (numerator / denominator);
}
class PoissonRow {
    constructor(public n: number, public numberRange: NumberRange) {
    }
}
class PoissonTable {
    constructor(public rows: PoissonRow[]) {
    }
    addRow(row: PoissonRow) {
        this.rows.push(row)
    }
    nFor(number: number) {
        return this.rows.find(row => row.numberRange.includes(number))?.n ?? 0
    }
}
function factorial(x: number): number {
    if (x == 0) {
        return 1;
    }
    return x * factorial(x - 1);
}
export const poissonTable = new PoissonTable([])
for (let i = 0; i < k_total; i++) {
    const f = poisson(i, landa)
    poissonTable.addRow(new PoissonRow(i, new NumberRange(total, total + f)))
    total += f
}
export function possionCarsForHour(): number {
    const randomNumber = Math.random()
    return poissonTable.nFor(randomNumber)
}
let carsFor24Hours = 0
for (let i = 0; i <= 24; i++) {
    carsFor24Hours += possionCarsForHour()
}
console.log(carsFor24Hours)
export {}