import { CronometroService } from './../cronometro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('divCronometro', [
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
export class CronometroComponent implements OnInit, OnDestroy {

  dateTime = new Date();
  botOpcao: string;
  contador: Subscription;
  stateSub: Subscription;
  contNumber: any;
  state = 'in';

  constructor( private cronometroService: CronometroService) { }

  ngOnInit(): void {
    this.dateTime = this.cronometroService.getDateTimeCrono();
    this.botOpcao = 'iniciar';

    this.contador = this.cronometroService.dateTimeCrono.subscribe(
      (date: Date) => {
        this.dateTime = date;
      }
    );
    this.cronometroService.botOpcaoCrono.subscribe(
      (func: string) => {
        this.botOpcao = func;
      }
    );
    this.stateSub = this.cronometroService.stateCronometro.subscribe(
      (st: string) => {
        this.state = st;
      }
    );
  }

  ngOnDestroy(): void {
    this.contador.unsubscribe();
    this.stateSub.unsubscribe();
  }

addZero(numero: number){
  return this.cronometroService.addZero(numero);
}

iniciarCronometro() {
  this.contNumber = this.cronometroService.iniciarCronometro();
}

pausarCronometro() {
  this.cronometroService.pausarCronometro();
  // this.ngOnDestroy();
}

retomarCronometro() {
  this.cronometroService.retomarCronometro();
}

zerarCronometro() {
  this.cronometroService.zerarCronometro();
  // this.ngOnDestroy();
}

}
