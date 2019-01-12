import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Car } from './car';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Title} from './title';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CarsService {

  private readonly URL = 'http://localhost:3000/cars';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  getAppTitle() {
    return this.http.get<Title>('http://localhost:3000/title').pipe(map((data: Title) => {
      return data.value;
    }));
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.URL).pipe(tap(_ => this.log('fetched cars')),
      catchError(this.handleError('getCars', [])));
  }

  addCar(carName: string) {
    const data = {
      name: carName,
      color: 'red'
    };
    return this.http.post(this.URL, data);
  }

  changeColor(car: Car, color: string) {
    car.color = color;
    return this.http.put(`http://localhost:3000/cars/${car.id}`, car, httpOptions);
    // return this.http.put(this.URL, car, httpOptions);
  }

  deleteCar(car: Car) {
    return this.http.delete(`http://localhost:3000/cars/${car.id}`).pipe();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Сервер недоступен - ${operation} failed ${error.message}`);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CarService: ${message}`);
  }
}
