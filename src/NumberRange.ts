export class NumberRange {
    constructor(public from: number, public to: number) {
    }
    includes(n: number){
        return this.from >= n && n < this.to
    }
}