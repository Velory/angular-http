import {Component, OnInit} from '@angular/core';
import {CarsService} from './cars.service';

import { Car } from './car';
import {Title} from './title';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cars: Car [] = [];
  carName = '';
  appTitle;
  colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'pink',
    'grey'
  ];

  constructor(private carsService: CarsService) {}

  ngOnInit() {
    // this.carsService.getAppTitle().subscribe((title: Title) => {
    //   this.appTitle = title.value;
    // });
    this.appTitle = this.carsService.getAppTitle();
  }

  // loadCars() {
  //   this.carsService.getCars().subscribe((response) => {
  //     this.cars = response as any;
  //     console.log(this.cars);
  //   });
  // }

  loadCars() {
    this.carsService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
      console.log(this.cars);
    });
  }

  addCar() {
    this.carsService.addCar(this.carName).subscribe((car: Car) => {
      this.cars.push(car);
    });
    this.carName = '';
  }

  getRandomColor() {
    const num = Math.round(Math.random() * (this.colors.length - 1));
    return this.colors[num];
  }

  setNewColor(car: Car) {
    this.carsService.changeColor(car, this.getRandomColor()).subscribe();
  }

  deleteCar(car: Car) {
    this.carsService.deleteCar(car).subscribe(() => {
      this.cars = this.cars.filter(c => c.id !== car.id);
    });
  }
}
