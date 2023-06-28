import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pokemon: any;
  @Input() pokemonList: Pokemon[] = [];
  @Output() pokemonSelected: EventEmitter<any> = new EventEmitter();
  searchText: string = '';
  filteredPokemonList: any[] = [];
  imageUrl: string = '';

  constructor(private http: HttpClient) { }

  selectPokemon() {
    this.fetchPokemonImage('https://pokeapi.co/api/v2/pokemon/' + this.pokemon.number + '/');
    this.pokemonSelected.emit(this.pokemon);
  }

  fetchPokemonImage(url: string) {
    this.http.get(url).subscribe((pokemonData: any) => {
      this.imageUrl = pokemonData.sprites.front_default;
    });
  }
  searchPokemon() {
    if (this.searchText.trim() === '') {
      this.filteredPokemonList = [];
    } else {
      const searchUrl = `https://pokeapi.co/api/v2/pokemon?limit=1000`;
      this.http.get(searchUrl).subscribe((data: any) => {
        const results: any[] = data.results;
        this.filteredPokemonList = results.filter((pokemon: any) =>
          pokemon.name && pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    }
  }

}
