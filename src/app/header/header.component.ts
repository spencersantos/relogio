import { RelogioService } from './../relogio.service';
import { CronometroService } from './../cronometro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private cronometroService: CronometroService, private relogioService: RelogioService) { }

  outAnimation() {
    const url = this.router.url;

    if (url === '/cronometro') {
      this.cronometroService.stateOutCronometro();
    }
    if (url === '/temporizador') {
      this.cronometroService.stateOutTemporizador();
    }
    if (url === '/') {
      this.relogioService.stateOutRelogio();
    }
  }

  onRouteToRelogio() {
    const url = this.router.url;

    if (url !== '/') {
      this.outAnimation();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 300);
    }
  }

  onRouteToCronometro() {
    const url = this.router.url;

    if (url !== '/cronometro') {
      this.outAnimation();
      setTimeout(() => {
        this.router.navigate(['/cronometro']);
      }, 300);
    }
  }

  onRouteToTemporizador() {
    const url = this.router.url;

    if (url !== '/temporizador') {
      this.outAnimation();
      setTimeout(() => {
        this.router.navigate(['/temporizador']);
      }, 300);
    }
  }

}
