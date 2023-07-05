import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.models';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  isLoading: boolean = false;
  pokemonList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  globalList: Pokemon[] = [];
  pokemonId!: number;
  pokemonTypeColors: { [key: string]: string } = {
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Vol': '#A890F0',
    'Eau': '#6890F0',
    'Insecte': '#A8B820',
    'Normal': '#A8A878',
    'Électrik': '#F8D030',
    'Fée': '#EE99AC',
    'Combat': '#C03028',
    'Psy': '#F85888',
    'Sol': '#E0C068',
    'Acier': '#B8B8D0',
    'Roche': '#B8A038',
    'Glace': '#98D8D8',
    'Dragon': '#7038F8',
    'Ténèbres': '#705848',
    'Spectre': '#705898',
  };

  constructor(private pokemonService: PokemonService) {
   }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemons => {
      this.globalList = pokemons;
      console.log(this.isLoading)
      this.isLoading = false;
      });
    }



}
