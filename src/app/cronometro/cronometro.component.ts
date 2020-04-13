import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['../app.component.css']
})
export class CronometroComponent implements OnInit {

  dateTime = new Date();
  botOpcao = 'iniciar';
  contador: any;
  subject = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    this.dateTime.setHours(0, 0, 0, 0);
  }

addZero(numero: number){
  if (numero < 10) {
    return '0' + numero;
  } else { return numero; }
}

iniciarCronometro() {
  this.botOpcao = 'iniciado';
  this.contador = setInterval(() => {
    this.dateTime.setTime(this.dateTime.getTime() + 5 * 100);
  }, 500);
}

pausarCronometro() {
  this.botOpcao = 'pausado';
  clearInterval(this.contador);
}

retomarCronometro() {
  this.botOpcao = 'iniciado';
  this.contador = setInterval(() => {
    this.dateTime.setTime(this.dateTime.getTime() + 5 * 100);
  }, 500);
}

zerarCronometro() {
  this.botOpcao = 'iniciar';
  clearInterval(this.contador);
  this.dateTime.setHours(0, 0, 0, 0);
}

}
