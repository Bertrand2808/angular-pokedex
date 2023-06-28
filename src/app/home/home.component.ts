import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private router: Router) { }
  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }


}
