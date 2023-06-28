import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { HttpClient } from '@angular/common/http';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() pokemonSelected: EventEmitter<Pokemon> = new EventEmitter();
  @Output() pokemonSelectedId: EventEmitter<number> = new EventEmitter();
  @Output() pokemonList: EventEmitter<Pokemon[]> = new EventEmitter();
  searchUrl = `https://pokeapi.co/api/v2/pokemon?limit=1000`;

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  ngOnInit() {

  }

  selectPokemon(pokemonId: number) {
    this.pokemonSelectedId.emit(pokemonId);
    this.pokemonService.getPokemonDetailsById(pokemonId).subscribe((response: any) => {
      const pokemon: Pokemon = {
        id: response.id,
        name: response.name,
        imageUrl: response.sprites.front_default,
      };
      this.pokemonSelected.emit(pokemon);
    });
  }

  searchPokemon(searchText: string) {
    if (searchText && searchText.trim() !== '') {
      this.pokemonService.getPokemonList().subscribe((data: any) => {
        const results: any[] = data.results;
        const filteredPokemonList: Pokemon[] = results.filter((pokemon: any) =>
          pokemon.name && pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        ).map((pokemon: any) => {
          return {
            id: pokemon.url.split('/')[6],
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
          };
        });
        this.pokemonList.emit(filteredPokemonList);
      });
    } else {
      this.pokemonList.emit([]);
    }
  }

  getPokemonList() {
    this.pokemonService.getPokemonList().subscribe((data: any) => {
      const results: any[] = data.results;
      const pokemonList: Pokemon[] = results.map((pokemon: any) => {
        return {
          id: pokemon.url.split('/')[6],
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
        };
      });
      this.pokemonList.emit(pokemonList);
    });
  }
}
