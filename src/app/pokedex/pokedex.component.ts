import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemonList(url: string) {
    this.http.get(url).subscribe((data: any) => {
      const results: any[] = data.results;
      results.forEach((pokemon: any) => {
        const pokemonId: number = +pokemon.url.split('/')[6];
        this.http.get(pokemon.url).subscribe((pokemonData: any) => {
          this.pokemonList.push({
            id: pokemonId,
            name: pokemonData.name,
            imageUrl: pokemonData.sprites.front_default
          });
          this.pokemonList.sort((a, b) => a.id - b.id); // Sort the pokemonList array by ID
        });
      });

      if (data.next) {
        this.getPokemonList(data.next);
      }
    });
  }
}
