import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { SafeUrl } from '@angular/platform-browser';
import { Pokemon } from '../model/pokemon.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() pokemon!: Pokemon;
  @Input() pokemonList: Pokemon[] = [];
  @Output() pokemonSelected: EventEmitter<string> = new EventEmitter();
  searchText = '';
  filteredPokemonList: Pokemon[] = [];
  imageUrl: SafeUrl = '';
  finalId!: string;
  selectedPokemon!: Pokemon;

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    console.log(pokemon);
    this.finalId = pokemon.id;
    console.log(this.finalId);
    this.fetchPokemonDetails(pokemon);
    this.pokemonSelected.emit(pokemon.id);
  }

  fetchPokemonDetails(pokemon: Pokemon) {
    this.pokemon = {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
    };
  }

  searchPokemon() {
    if (this.searchText && this.searchText.trim() !== '') {
      const results: Pokemon[] = JSON.parse(localStorage.getItem('pokemon') || '{}');
      this.filteredPokemonList = results.filter((f) => {
        f.id === this.pokemon.id
      }).map((m => m))
    } else {
      this.filteredPokemonList = [];
    }
  }
}
