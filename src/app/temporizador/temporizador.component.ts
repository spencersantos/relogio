import { CronometroService } from './../cronometro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { style, trigger, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('divTemporizador', [
      state('in', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'scale(0.1)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale(0.1)'
        }),
        animate(300)
      ]),
      transition('in => out', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate(300)
      ]),
    ])
  ]
})
export class TemporizadorComponent implements OnInit, OnDestroy {
  dateTime = new Date();
  botOpcao: string;
  contador: Subscription;
  stateSub: Subscription;
  hora = 0;
  minuto = 0;
  segundo = 0;
  state = 'in';

  constructor(private cronometroService: CronometroService) { }

  ngOnInit(): void {
    this.botOpcao = 'iniciar';

    this.contador = this.cronometroService.dateTimeTemp.subscribe(
      (date: Date) => {
        this.dateTime = date;
      }
    );
    this.cronometroService.botOpcaoTemp.subscribe(
      (op: string) => {
        this.botOpcao = op;
      }
    );
    if (this.botOpcao === 'iniciar') {
      this.dateTime.setHours(this.hora, this.minuto, this.segundo, 0);
    } else {
      this.dateTime = this.cronometroService.getDateTimeTemp();
    }
    this.stateSub = this.cronometroService.stateTemporizador.subscribe(
      (st: string) => {
        this.state = st;
      }
    );
  }

  ngOnDestroy(): void {
    this.contador.unsubscribe();
    this.stateSub.unsubscribe();
  }

  addZero(numero: number) {
    return this.cronometroService.addZero(numero);
  }

  iniciarTemporizador() {
    this.cronometroService.iniciarTemporizador(this.hora, this.minuto, this.segundo);
  }

  pausarTemporizador() {
    // this.ngOnDestroy();
    this.cronometroService.pausarTemporizador();
  }

  retomarTemporizador() {
    this.cronometroService.retomarTemporizador();
  }

  zerarTemporizador() {
    this.cronometroService.zerarTemporizador();
    // this.ngOnDestroy();
  }
}
