import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['../app.component.css'],
})
export class TemporizadorComponent implements OnInit {
  dateTime = new Date();
  botOpcao = 'iniciar';
  contador: any;
  hora = 0;
  minuto = 0;
  segundo = 0;

  constructor() {}

  ngOnInit(): void {
    this.dateTime.setHours(this.hora, this.minuto, this.segundo, 0);
  }

  addZero(numero: number) {
    if (numero < 10) {
      return '0' + numero;
    } else {
      return numero;
    }
  }

  iniciarCronometro() {
    if (
      this.hora > 23 ||
      this.minuto > 59 ||
      this.segundo > 59 ||
      this.hora < 0 ||
      this.minuto < 0 ||
      this.segundo < 0
    ) {
      alert(
        'Existe valor de hora incorreto! menor hora possivel 0:0:0 e maior possivel 23:59:59'
      );
    } else {
      if (this.hora === 0 && this.minuto === 0 && this.segundo === 0) {
        alert('Não foi adicionado tempo ao temporizador.');
      } else {
        this.botOpcao = 'iniciado';
        this.dateTime.setHours(this.hora, this.minuto, this.segundo, 999);
        this.contador = setInterval(() => {
          this.dateTime.setTime(this.dateTime.getTime() - 10 * 100);
          if (
            this.dateTime.getHours() === 0 &&
            this.dateTime.getMinutes() === 0 &&
            this.dateTime.getSeconds() === 0 &&
            this.dateTime.getMilliseconds() === 999
          ) {
            this.dateTime.setHours(0, 0, 0, 0);
            clearInterval(this.contador);
            this.botOpcao = 'iniciar';
            setTimeout( () =>
            alert('Chegou a hora!'), 1
            );
          }
        }, 999);
      }
    }
  }

  pausarCronometro() {
    this.botOpcao = 'pausado';
    clearInterval(this.contador);
  }

  retomarCronometro() {
    this.botOpcao = 'iniciado';
    this.contador = setInterval(() => {
      this.dateTime.setTime(this.dateTime.getTime() - 5 * 100);
    }, 500);
  }

  zerarCronometro() {
    this.botOpcao = 'iniciar';
    clearInterval(this.contador);
    this.dateTime.setHours(0, 0, 0, 0);
  }
}
