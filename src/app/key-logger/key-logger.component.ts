import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  styleUrls: ['./key-logger.component.css'],
  template: `<input #toTarget type="text">`,
})
export class KeyLoggerComponent {
  @ViewChild('toTarget') target!: ElementRef;
  title = 'key-logger';
  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  constructor() {
    this.title$.subscribe(this.logKey);
  }

  // logger les touches du clavier en excluant les numériques
  logKey = (event: any) => {
    fromEvent(this.target.nativeElement, 'keydown').subscribe((res: any) => {
      if (res.key.match(/^[a-zA-Z]+$/)) {
        console.log(res.key);
      }
    });
  }
}
