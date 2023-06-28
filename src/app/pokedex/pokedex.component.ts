import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
}

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
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemonList(url: string) {
    this.pokemonService.getPokemonList(url).subscribe((data: any) => {
      const results: any[] = data.results;
      results.forEach((pokemon: any) => {
        const pokemonId: number = +pokemon.url.split('/')[6];
        this.pokemonService.getPokemonDetails(pokemon.url).subscribe((pokemonData: any) => {
          this.pokemonList.push({
            id: pokemonId,
            name: pokemonData.name,
            imageUrl: pokemonData.sprites.front_default,
            url: pokemon.url
          });
          this.pokemonList.sort((a, b) => a.id - b.id); // Sort the pokemonList array by ID
        });
      });
      if (data.next) {
        this.getPokemonList(data.next);
      }
    });
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    this.pokemonService.getPokemonDetails(pokemon.url).subscribe((pokemonData: any) => {
      // Effectuez les actions souhaitées avec les détails du Pokémon
      console.log('Détails du Pokémon sélectionné :', pokemonData);
    });
  }
}
