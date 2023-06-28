import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';

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
  @Input() pokemon: any = { number: '', name: '', imageUrl: '' };
  @Input() pokemonList: Pokemon[] = [];
  @Output() pokemonSelected: EventEmitter<any> = new EventEmitter();
  searchText: string = '';
  filteredPokemonList: any[] = [];
  imageUrl: string = '';

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  selectPokemon(pokemon: any) {
    this.fetchPokemonDetails(pokemon);
    this.pokemonSelected.emit(pokemon.number);
  }

  fetchPokemonImage() {
    this.pokemonService.getPokemonList('https://pokeapi.co/api/v2/pokemon/' + this.pokemon.number + '/')
      .subscribe((pokemonData: any) => {
        this.imageUrl = pokemonData.sprites.front_default;
        this.pokemon.name = pokemonData.name;
      });
      console.log(this.pokemon.name);
      console.log(this.pokemon.number)
  }

  fetchPokemonDetails(pokemon: any) {
    this.pokemonService.getPokemonDetails(pokemon.url)
      .subscribe((pokemonData: any) => {
        this.pokemon.number = pokemonData.id;
        this.pokemon.name = pokemonData.name;
        this.pokemon.imageUrl = pokemonData.sprites.front_default;
        this.pokemonSelected.emit(this.pokemon);
      });
  }

  searchPokemon() {
    if (this.searchText && this.searchText.trim() !== '') {
      const searchUrl = `https://pokeapi.co/api/v2/pokemon?limit=1000`;
      this.http.get(searchUrl).subscribe((data: any) => {
        const results: any[] = data.results;
        this.filteredPokemonList = results.filter((pokemon: any) =>
          pokemon.name && pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    } else {
      this.filteredPokemonList = [];
    }
  }
}
