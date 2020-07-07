import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CronometroService {

  referenceDateTime = new Date();
  dateTime = new Subject<Date>();
  botOpcao = new BehaviorSubject<string>('iniciar');
  contador = new Subject<number>();
  interval: any;


  constructor() { }

  addZero(numero: number){
    if (numero < 10) {
      return '0' + numero;
    } else { return numero; }
  }

  iniciarCronometro() {
    this.referenceDateTime.setHours(0, 0, 0, 0);
    this.botOpcao.next('iniciado');
    this.interval = setInterval(() => {
      this.referenceDateTime.setTime(this.referenceDateTime.getTime() + 5 * 100);
      this.dateTime.next(this.referenceDateTime);
    }
    , 500);
  }

  pausarCronometro() {
    this.botOpcao.next('pausado');
    clearInterval(this.interval);
  }

  retomarCronometro() {
    this.botOpcao.next('iniciado');
    this.interval = setInterval(() => {
      this.referenceDateTime.setTime(this.referenceDateTime.getTime() + 5 * 100);
      this.dateTime.next(this.referenceDateTime);
    }, 500);
  }

  retomarTemporizador() {
    this.botOpcao.next('iniciado');
    this.interval = setInterval(() => {
      this.referenceDateTime.setTime(this.referenceDateTime.getTime() - 5 * 100);
      this.dateTime.next(this.referenceDateTime);
    }, 500);
  }

  zerarCronometro() {
    this.botOpcao.next('iniciar');
    this.referenceDateTime.setHours(0, 0, 0, 0);
    this.dateTime.next(this.referenceDateTime);
  }

  iniciarTemporizador(hora: number, minuto: number, segundo: number) {
    if (
      hora > 23 ||
      minuto > 59 ||
      segundo > 59 ||
      hora < 0 ||
      minuto < 0 ||
      segundo < 0
    ) {
      alert(
        'Existe valor de hora incorreto! menor hora possivel 0:0:0 e maior possivel 23:59:59'
      );
    } else {
      if (hora === 0 && minuto === 0 && segundo === 0) {
        alert('Não foi adicionado tempo ao temporizador.');
      } else {
        this.botOpcao.next('iniciado');
        this.referenceDateTime.setHours(hora, minuto, segundo, 999);
        this.interval = setInterval(() => {
          this.referenceDateTime.setTime(this.referenceDateTime.getTime() - 10 * 100);
          this.dateTime.next(this.referenceDateTime);
          if (
            this.referenceDateTime.getHours() === 0 &&
            this.referenceDateTime.getMinutes() === 0 &&
            this.referenceDateTime.getSeconds() === 0 &&
            this.referenceDateTime.getMilliseconds() === 999
          ) {
            this.referenceDateTime.setHours(0, 0, 0, 0);
            this.dateTime.next(this.referenceDateTime);
            clearInterval(this.interval);
            this.botOpcao.next('iniciar');
            setTimeout( () =>
            alert('Chegou a hora'), 1
            );
          }
        }, 999);
      }
    }
  }

}
