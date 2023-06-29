import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../model/pokemon.models';
import { map } from 'rxjs';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  globalList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
    this.getPokemonList();
   }

  ngOnInit() {

    }

  getPokemonList() {
    console.log('get PokemonList');
    this.pokemonService.getPokemonSubject().subscribe({next: async (pokemons: Pokemon[])=> {
      if (pokemons.length > 0) {
        this.globalList = await pokemons;
        console.log('global list : ', this.globalList.length);
      }
    },});
  }
}
