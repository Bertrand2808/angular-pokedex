import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pokedex';
  constructor(private router: Router) { }
  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }
}
