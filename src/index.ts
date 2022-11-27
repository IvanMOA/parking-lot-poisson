import * as assert from "assert";
import {possionCarsForHour} from "./poisson";
import {NumberRange} from "./NumberRange";
class RectangularNumber {
    constructor(public value: number) {
    }
}
function uniformDistribution(r: RectangularNumber, interval: NumberRange): number {
    return interval.from + (interval.to - interval.from) * r.value
}
function randomMinutesToOccupyParkingLotFor(): number {
    return uniformDistribution(new RectangularNumber(Math.random()), new NumberRange(10, 30))
}
class ParkingLotSpot {
    isFree = true
    private minutesToOccupy = -1
    private wasOccupiedAtMinute = -1
    constructor() {
    }
    parkCar(currentMinute: number, minutesToOccupy: number) {
        this.wasOccupiedAtMinute = currentMinute
        this.minutesToOccupy = minutesToOccupy
        this.isFree = false
    }
    clearIfPossible(currentMinute: number) {
        const minuteForWhichSpotShouldBeFree = this.wasOccupiedAtMinute + this.minutesToOccupy
        if (currentMinute >= minuteForWhichSpotShouldBeFree) {
            this.isFree = true
        }
    }
}
class ParkingLot {
    private currentMinute = 0
    private availableSpots = [
        new ParkingLotSpot(),
        new ParkingLotSpot(),
        new ParkingLotSpot(),
        new ParkingLotSpot(),
        new ParkingLotSpot(),
        new ParkingLotSpot(),
    ]
    constructor() {
    }
    get hasFreeSpot(): boolean {
        return this.availableSpots.some(spot => spot.isFree)
    }
    incrementMinute() {
        this.currentMinute += 1
    }
    parkCar(): void {
        assert(this.hasFreeSpot)
        const minutesToOccupyFor = randomMinutesToOccupyParkingLotFor()
        console.log(`Se obtuvo un auto en el minuto ${this.currentMinute} y se estacionó por ${minutesToOccupyFor} minutos`)
        this.availableSpots.find(spot => spot.isFree)!.parkCar(this.currentMinute, minutesToOccupyFor)
    }
    clearSpotsIfPossible() {
        this.availableSpots.forEach(spot => spot.clearIfPossible(this.currentMinute))
    }
}
const parkingLot = new ParkingLot()
let averageCarsPerYear =  0
for (let i = 0; i <= 8760; i++) {
    averageCarsPerYear += possionCarsForHour()
}
const MINUTES_PER_YEAR = 525600
const carsPerMinute = (averageCarsPerYear / 525600)
const minutesSimulated = MINUTES_PER_YEAR  // Un año
let totalCarsThatCouldPark = 0
let totalCars = 0
for (let i = 0; i < minutesSimulated; i++) {
    totalCars += 1
    const shouldParkACar = Math.random() <= carsPerMinute
    if (shouldParkACar) {
        if (parkingLot.hasFreeSpot) {
            parkingLot.parkCar()
            totalCarsThatCouldPark += 1
        } else {
            console.log('Ocupado')
        }
    }
    parkingLot.incrementMinute()
    parkingLot.clearSpotsIfPossible()
}
const carsThatCouldNotPark = averageCarsPerYear - totalCarsThatCouldPark
console.log(`De un total de ${averageCarsPerYear} autos por año, ${totalCarsThatCouldPark} se pudieron estacionar y ${carsThatCouldNotPark} no`)
console.log(`${(totalCarsThatCouldPark / averageCarsPerYear ) * 100}% se pudieron estacionar`)
export {}