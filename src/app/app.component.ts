import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pokedex';
  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });
  router: any;

  constructor() {
    this.title$.subscribe(this.setTitle);
  }

  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  private setTitle = () => {
    const timestamp = new Date().getMilliseconds();
    this.title = `Learning Angular (${timestamp})`;
  }

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  }

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }
}

