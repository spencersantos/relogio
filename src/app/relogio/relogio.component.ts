import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['../app.component.css']
})
export class RelogioComponent implements OnInit {

  dateTime = new Date();

  ngOnInit(): void {
  }

  constructor() {
    setInterval(() => {
      this.dateTime = new Date();
    }, 100);
}

addZero(numero: number){
  if (numero < 10) {
    return '0' + numero;
  } else { return numero; }
}

}
