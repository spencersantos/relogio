import { CronometroService } from './../cronometro.service';
import { RelogioService } from './../relogio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['../app.component.css']
})
export class CronometroComponent implements OnInit, OnDestroy {

  dateTime = new Date();
  botOpcao: string;
  contador: Subscription;
  contNumber: any;

  constructor( private cronometroService: CronometroService) { }


  ngOnInit(): void {
    this.dateTime.setHours(0, 0, 0, 0);

    this.contador = this.cronometroService.dateTime.subscribe(
      (date: Date) => {
        this.dateTime = date;
      }
    );
    this.cronometroService.botOpcao.subscribe(
      (func: string) => {
        this.botOpcao = func;
      }
    );
  }

  ngOnDestroy(): void {
    this.contador.unsubscribe();
  }

addZero(numero: number){
  return this.cronometroService.addZero(numero);
}

iniciarCronometro() {
  this.contNumber = this.cronometroService.iniciarCronometro();
}

pausarCronometro() {
  this.ngOnDestroy();
  this.cronometroService.pausarCronometro();
}

retomarCronometro() {
  this.cronometroService.retomarCronometro();
}

zerarCronometro() {
  this.cronometroService.zerarCronometro();
  this.ngOnDestroy();
}

}
