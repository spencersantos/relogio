import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelogioService {

  dateTime = new Subject<Date>();
  state = new Subject<string>();

  constructor() {
    setInterval(() => {
      this.dateTime.next(new Date());
    }, 100);
  }

  stateOutRelogio() {
    this.state.next('out');
  }

  addZero(numero: number){
    if (numero < 10) {
      return '0' + numero;
    } else { return numero; }
  }
}
