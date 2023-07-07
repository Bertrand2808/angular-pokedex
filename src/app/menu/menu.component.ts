import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  isCollapsed: boolean = false;

  constructor(
    private router: Router
    ) { }

  /**
   *  Go to the pokedex page
   *
   * @memberof MenuComponent
   */
  goToPokedex() {
      this.router.navigate(['/pokedex']);
    }

  /**
   *  Go to the trainer page
   *
   * @memberof MenuComponent
   */
  goToTrainer() {
      this.router.navigate(['/trainer']);
    }

  /**
   *  Go to the choice page
   *
   * @memberof MenuComponent
   */
  goToChoice() {
      this.router.navigate(['/choice']);
    }

  /**
   *  Collapse the menu
   *
   * @memberof MenuComponent
   */
  toggleCollapse() {
      console.log('toggleCollapse');
      this.isCollapsed = !this.isCollapsed;
    }

}
