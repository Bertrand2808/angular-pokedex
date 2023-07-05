import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  isCollapsed: boolean = false;
  constructor(private router: Router) { }
  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

  goToTrainer() {
    this.router.navigate(['/trainer']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
  goToChoice() {
    this.router.navigate(['/choice']);
  }

  toggleCollapse() {
    console.log('toggleCollapse');
    this.isCollapsed = !this.isCollapsed;
  }

}
