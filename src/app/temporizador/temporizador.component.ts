import { CronometroService } from './../cronometro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['../app.component.css'],
})
export class TemporizadorComponent implements OnInit, OnDestroy {
  dateTime = new Date();
  botOpcao: string;
  contador: Subscription;
  hora = 0;
  minuto = 0;
  segundo = 0;

  constructor( private cronometroService: CronometroService) {}

  ngOnInit(): void {
    this.dateTime.setHours(this.hora, this.minuto, this.segundo, 0);

    this.contador = this.cronometroService.dateTime.subscribe(
      (date: Date) => {
        this.dateTime = date;
      }
    );
    this.cronometroService.botOpcao.subscribe(
      (op: string) => {
        this.botOpcao = op;
      }
    );

  }

  ngOnDestroy(): void {
    this.contador.unsubscribe();
  }

  addZero(numero: number) {
    return this.cronometroService.addZero(numero);
  }

  iniciarTemporizador() {
    this.cronometroService.iniciarTemporizador(this.hora, this.minuto, this.segundo);
  }

  pausarCronometro() {
    this.ngOnDestroy();
    this.cronometroService.pausarCronometro();
  }

  retomarCronometro() {
    this.cronometroService.retomarTemporizador();
  }

  zerarCronometro() {
    this.cronometroService.zerarCronometro();
    this.ngOnDestroy();
  }
}
