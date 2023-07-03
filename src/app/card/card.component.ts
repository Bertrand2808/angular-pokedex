import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { SafeUrl } from '@angular/platform-browser';
import { Pokemon } from '../model/pokemon.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() globalList: Pokemon[] = [];
  @Input() pokemonList: Pokemon[] = [];
  @Input() pokemonSelected: Pokemon | null = null;

  imageUrl: SafeUrl = '';
  finalId!: string;
  selectedPokemon!: Pokemon;

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  selectPokemon(pokemon: Pokemon) {
    console.log(pokemon);
  }
  searchPokemon(event: Event) {
    console.log(event);
  }
}
