import { RelogioService } from './../relogio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['../app.component.css']
})
export class RelogioComponent implements OnInit, OnDestroy {

  dateTime = new Date();
  private subs: Subscription;

  constructor(private relogioService: RelogioService) { }


  ngOnInit() {
    this.subs = this.relogioService.dateTime.subscribe(
      (date: Date) => {
        this.dateTime = date;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addZero(numero: number) {
    return this.relogioService.addZero(numero);
  }

}
