import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../model/pokemon.models';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    const results: Pokemon[] = JSON.parse(localStorage.getItem('pokemon') || '{}');
    console.log(results);
    results?.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(this.pokemonService.baseUrl+pokemon.id).subscribe({ next: (pokemonData) => {
          this.pokemonList.push({
            id: pokemonData.id,
            name: pokemonData.name,
            imageUrl: pokemonData.imageUrl,
          });
        }
      });
    });
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    this.pokemonService.getPokemonDetails(this.pokemonService.baseUrl+pokemon.id).subscribe((pokemonData) => {
      // Effectuez les actions souhaitées avec les détails du Pokémon
      console.log('Détails du Pokémon sélectionné :', pokemonData);
    });
  }
}
