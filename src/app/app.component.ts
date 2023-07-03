import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './model/pokemon.models';

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

  constructor(private pokemonService: PokemonService) {
    this.title$.subscribe(this.setTitle);
    this.getPokemonList();
  }

  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  getPokemonList() {
    console.log('get PokemonList from app component');
    this.pokemonService.getPokemonList().subscribe({next: (pokemonData: Pokemon[]) => {
      console.log(pokemonData);
      localStorage.setItem('pokemon', JSON.stringify(pokemonData));
      this.pokemonService.setPokemonSubject(pokemonData);
    }});
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

