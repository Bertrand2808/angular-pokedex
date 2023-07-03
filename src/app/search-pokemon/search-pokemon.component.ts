import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.models';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  searchValue = '';
  filteredPokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

  search(): void {
    if (this.searchValue !== '') {
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.fr.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      this.filteredPokemons = [];
    }
  }

}
