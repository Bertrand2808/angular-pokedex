import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor() { }
  /**
   *  Get the trainer from the local storage
   *
   * @return {*}  {*}
   * @memberof TrainerService
   */
  getTrainer(): any {
      const trainer = localStorage.getItem('trainer');
      return trainer ? JSON.parse(trainer) : null;
    }
  /**
   *  Set the trainer in the local storage
   *
   * @param {*} trainer
   * @memberof TrainerService
   */
  setTrainer(trainer: any): void {
      localStorage.setItem('trainer', JSON.stringify(trainer));
    }

    deleteTrainer(): void {
      console.log('delete trainer');
      localStorage.removeItem('trainer');
    }
}
