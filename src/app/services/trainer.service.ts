import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor() { }

  getTrainer(): any {
    const trainer = localStorage.getItem('trainer');
    return trainer ? JSON.parse(trainer) : null;
  }

  setTrainer(trainer: any): void {
    localStorage.setItem('trainer', JSON.stringify(trainer));
  }
}
