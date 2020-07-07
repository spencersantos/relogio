import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelogioService {

  dateTime = new Subject<Date>();

  constructor() {
    setInterval(() => {
      this.dateTime.next(new Date());
    }, 100);
  }

  addZero(numero: number){
    if (numero < 10) {
      return '0' + numero;
    } else { return numero; }
  }
}
