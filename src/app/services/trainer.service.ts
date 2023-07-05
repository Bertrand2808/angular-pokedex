import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private trainerData = new BehaviorSubject<{pseudo: string, age: number}>({pseudo: '', age: 0});
  currentData = this.trainerData.asObservable();

  constructor() { }

  changeData(data: {pseudo: string, age: number}) {
    this.trainerData.next(data);
  }
}
