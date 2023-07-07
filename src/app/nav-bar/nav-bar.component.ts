import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  constructor(
    private router: Router
    ) { }
  /**
   *  Collapse the menu
   *
   * @memberof NavBarComponent
   */
  goToPokedex() {
      this.router.navigate(['/pokedex']);
    }
  /**
   *  Go to the trainer page
   *
   * @memberof NavBarComponent
   */
  goToTrainer() {
      this.router.navigate(['/trainer']);
    }
  /**
   * Go to the choice page
   *
   * @memberof NavBarComponent
   */
  goToChoice() {
      this.router.navigate(['/choice']);
    }
}
