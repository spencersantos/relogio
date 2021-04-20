import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CronometroService {

  referenceDateTimeTemp = new Date();
  referenceDateTimeCrono = new Date();
  dateTimeTemp = new Subject<Date>();
  dateTimeCrono = new Subject<Date>();
  botOpcaoTemp = new BehaviorSubject<string>('iniciar');
  botOpcaoCrono = new BehaviorSubject<string>('iniciar');
  contador = new Subject<number>();
  intervalTemp: any;
  intervalCrono: any;
  stateCronometro = new Subject<string>();
  stateTemporizador = new Subject<string>();

  constructor() {
    this.referenceDateTimeTemp.setHours(0, 0, 0, 0);
    this.referenceDateTimeCrono.setHours(0, 0, 0, 0);
  }


  getDateTimeTemp() {
    return this.referenceDateTimeTemp;
  }

  getDateTimeCrono() {
    return this.referenceDateTimeCrono;
  }

  stateOutCronometro() {
    this.stateCronometro.next('out');
  }

  stateOutTemporizador() {
    this.stateTemporizador.next('out');
  }

  addZero(numero: number) {
    if (numero < 10) {
      return '0' + numero;
    } else { return numero; }
  }

  iniciarCronometro() {
    this.referenceDateTimeCrono.setHours(0, 0, 0, 0);
    this.botOpcaoCrono.next('iniciado');
    this.intervalCrono = setInterval(() => {
      this.referenceDateTimeCrono.setTime(this.referenceDateTimeCrono.getTime() + 5 * 100);
      this.dateTimeCrono.next(this.referenceDateTimeCrono);
    }
      , 500);
  }

  pausarCronometro() {
    this.botOpcaoCrono.next('pausado');
    clearInterval(this.intervalCrono);
  }

  pausarTemporizador() {
    this.botOpcaoTemp.next('pausado');
    clearInterval(this.intervalTemp);
  }

  retomarCronometro() {
    this.botOpcaoCrono.next('iniciado');
    this.intervalCrono = setInterval(() => {
      this.referenceDateTimeCrono.setTime(this.referenceDateTimeCrono.getTime() + 5 * 100);
      this.dateTimeCrono.next(this.referenceDateTimeCrono);
    }, 500);
  }

  retomarTemporizador() {
    this.botOpcaoTemp.next('iniciado');
    this.intervalTemp = setInterval(() => {
      this.referenceDateTimeTemp.setTime(this.referenceDateTimeTemp.getTime() - 5 * 100);
      this.dateTimeTemp.next(this.referenceDateTimeTemp);
    }, 500);
  }

  zerarCronometro() {
    this.botOpcaoCrono.next('iniciar');
    this.referenceDateTimeCrono.setHours(0, 0, 0, 0);
    this.dateTimeCrono.next(this.referenceDateTimeCrono);
  }

  zerarTemporizador() {
    this.botOpcaoTemp.next('iniciar');
    this.referenceDateTimeTemp.setHours(0, 0, 0, 0);
    this.dateTimeTemp.next(this.referenceDateTimeTemp);
  }

  iniciarTemporizador(hora: number, minuto: number, segundo: number) {
    if (
      hora > 23 ||
      (minuto || segundo) > 59 ||
      (hora || minuto || segundo) < 0
    ) {
      alert(
        'Existe valor de hora incorreto! menor hora possivel 0:0:0 e maior possivel 23:59:59'
      );
    } else {
      if (hora === 0 && minuto === 0 && segundo === 0) {
        alert('Não foi adicionado tempo ao temporizador.');
      } else {
        this.botOpcaoTemp.next('iniciado');
        this.referenceDateTimeTemp.setHours(hora, minuto, segundo, 999);
        this.intervalTemp = setInterval(() => {
          this.referenceDateTimeTemp.setTime(this.referenceDateTimeTemp.getTime() - 10 * 100);
          this.dateTimeTemp.next(this.referenceDateTimeTemp);
          if (
            this.referenceDateTimeTemp.getHours() === 0 &&
            this.referenceDateTimeTemp.getMinutes() === 0 &&
            this.referenceDateTimeTemp.getSeconds() === 0 &&
            this.referenceDateTimeTemp.getMilliseconds() === 999
          ) {
            this.referenceDateTimeTemp.setHours(0, 0, 0, 0);
            this.dateTimeTemp.next(this.referenceDateTimeTemp);
            clearInterval(this.intervalTemp);
            this.botOpcaoTemp.next('iniciar');
            setTimeout(() =>
              alert('Chegou a hora'), 1
            );
          }
        }, 999);
      }
    }
  }

}
