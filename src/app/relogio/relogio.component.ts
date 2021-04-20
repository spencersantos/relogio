import { RelogioService } from './../relogio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('divRelogio', [
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
export class RelogioComponent implements OnInit, OnDestroy {

  dateTime = new Date();
  private subs: Subscription;
  state = 'in';

  constructor(private relogioService: RelogioService) { }


  ngOnInit() {
    this.subs = this.relogioService.dateTime.subscribe(
      (date: Date) => {
        this.dateTime = date;
      }
    );
    this.relogioService.state.subscribe(
      (state: string) => {
        this.state = state;
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
